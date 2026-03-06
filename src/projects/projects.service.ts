import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateProjectDto) {
    const existing = await this.prisma.project.findUnique({ where: { slug: dto.slug } });
    if (existing) throw new ConflictException('Bu slug zaten kullanımda');

    return this.prisma.project.create({
      data: {
        name: dto.name,
        description: dto.description,
        slug: dto.slug,
        members: {
          create: { userId, role: 'OWNER', title: 'Proje Sahibi' },
        },
      },
      include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } },
    });
  }

  async findAll(userId: string) {
    return this.prisma.project.findMany({
      where: { members: { some: { userId } }, isActive: true },
      include: {
        _count: { select: { cases: true, members: true } },
        members: {
          where: { userId },
          select: { role: true, title: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, members: { some: { userId } }, isActive: true },
      include: {
        members: { include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } } },
        _count: { select: { cases: true } },
      },
    });
    if (!project) throw new NotFoundException('Proje bulunamadı');
    return project;
  }

  async update(userId: string, projectId: string, dto: UpdateProjectDto) {
    await this.checkAdminAccess(userId, projectId);
    if (dto.slug) {
      const existing = await this.prisma.project.findFirst({
        where: { slug: dto.slug, id: { not: projectId } },
      });
      if (existing) throw new ConflictException('Bu slug zaten kullanımda');
    }
    return this.prisma.project.update({ where: { id: projectId }, data: dto });
  }

  async remove(userId: string, projectId: string) {
    await this.checkOwnerAccess(userId, projectId);
    return this.prisma.project.update({ where: { id: projectId }, data: { isActive: false } });
  }

  private async checkAdminAccess(userId: string, projectId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member || (member.role !== 'OWNER' && member.role !== 'ADMIN')) {
      throw new ForbiddenException('Bu işlem için yetkiniz yok');
    }
    return member;
  }

  private async checkOwnerAccess(userId: string, projectId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member || member.role !== 'OWNER') {
      throw new ForbiddenException('Bu işlem sadece proje sahibi tarafından yapılabilir');
    }
    return member;
  }
}
