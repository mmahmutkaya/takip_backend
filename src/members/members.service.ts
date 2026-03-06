import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InviteMemberDto, UpdateMemberDto } from './dto/member.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class MembersService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async invite(adminId: string, projectId: string, dto: InviteMemberDto) {
    await this.checkAdminAccess(adminId, projectId);
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı');

    const existing = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId: user.id } },
    });
    if (existing) throw new ConflictException('Kullanıcı zaten bu projenin üyesi');

    const member = await this.prisma.projectMember.create({
      data: { projectId, userId: user.id, role: dto.role ?? 'MEMBER', title: dto.title },
      include: { user: { select: { id: true, name: true, email: true } } },
    });

    await this.notifications.create({
      recipientId: user.id,
      type: 'MEMBER_ADDED',
      message: 'Bir projeye davet edildiniz',
      payload: { projectId },
    });

    return member;
  }

  async findAll(userId: string, projectId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member) throw new ForbiddenException('Bu projeye erişim yetkiniz yok');

    return this.prisma.projectMember.findMany({
      where: { projectId },
      include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
    });
  }

  async update(adminId: string, projectId: string, memberId: string, dto: UpdateMemberDto) {
    await this.checkAdminAccess(adminId, projectId);
    const member = await this.prisma.projectMember.findFirst({
      where: { id: memberId, projectId },
    });
    if (!member) throw new NotFoundException('Üye bulunamadı');
    if (member.role === 'OWNER') throw new ForbiddenException('Proje sahibinin rolü değiştirilemez');

    return this.prisma.projectMember.update({ where: { id: memberId }, data: dto });
  }

  async remove(adminId: string, projectId: string, memberId: string) {
    await this.checkAdminAccess(adminId, projectId);
    const member = await this.prisma.projectMember.findFirst({
      where: { id: memberId, projectId },
    });
    if (!member) throw new NotFoundException('Üye bulunamadı');
    if (member.role === 'OWNER') throw new ForbiddenException('Proje sahibi projeden çıkarılamaz');

    return this.prisma.projectMember.delete({ where: { id: memberId } });
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
}
