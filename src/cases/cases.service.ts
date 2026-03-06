import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseDto, UpdateCaseDto, FilterCaseDto } from './dto/case.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CasesService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async create(userId: string, projectId: string, dto: CreateCaseDto) {
    await this.checkMemberAccess(userId, projectId, ['OWNER', 'ADMIN', 'MEMBER']);

    const caseItem = await this.prisma.case.create({
      data: {
        title: dto.title,
        description: dto.description,
        priority: dto.priority,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
        projectId,
        createdById: userId,
        assigneeId: dto.assigneeId,
      },
      include: this.caseIncludes(),
    });

    if (dto.assigneeId && caseItem.assignee) {
      await this.notifications.create({
        recipientId: caseItem.assignee.userId,
        type: 'CASE_ASSIGNED',
        message: `Size "${caseItem.title}" kaydı atandı`,
        caseId: caseItem.id,
        payload: { projectId },
      });
    }

    return caseItem;
  }

  async findAll(userId: string, projectId: string, filter: FilterCaseDto) {
    await this.checkMemberAccess(userId, projectId);
    return this.prisma.case.findMany({
      where: {
        projectId,
        ...(filter.status && { status: filter.status }),
        ...(filter.priority && { priority: filter.priority }),
        ...(filter.assigneeId && { assigneeId: filter.assigneeId }),
      },
      include: this.caseIncludes(),
      orderBy: [{ status: 'asc' }, { priority: 'desc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(userId: string, projectId: string, caseId: string) {
    await this.checkMemberAccess(userId, projectId);
    const caseItem = await this.prisma.case.findFirst({
      where: { id: caseId, projectId },
      include: {
        ...this.caseIncludes(),
        updates: {
          include: { author: { select: { id: true, name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!caseItem) throw new NotFoundException('Kayıt bulunamadı');
    return caseItem;
  }

  async update(userId: string, projectId: string, caseId: string, dto: UpdateCaseDto) {
    await this.checkMemberAccess(userId, projectId, ['OWNER', 'ADMIN', 'MEMBER']);
    const existing = await this.prisma.case.findFirst({ where: { id: caseId, projectId } });
    if (!existing) throw new NotFoundException('Kayıt bulunamadı');

    const data: any = { ...dto };
    if (dto.dueDate) data.dueDate = new Date(dto.dueDate);
    if (dto.status === 'CLOSED') data.closedAt = new Date();
    if (dto.status && dto.status !== 'CLOSED') data.closedAt = null;

    const updated = await this.prisma.case.update({
      where: { id: caseId },
      data,
      include: this.caseIncludes(),
    });

    if (dto.assigneeId && dto.assigneeId !== existing.assigneeId && updated.assignee) {
      await this.notifications.create({
        recipientId: updated.assignee.userId,
        type: 'CASE_ASSIGNED',
        message: `Size "${updated.title}" kaydı atandı`,
        caseId: updated.id,
        payload: { projectId },
      });
    }

    return updated;
  }

  async remove(userId: string, projectId: string, caseId: string) {
    await this.checkMemberAccess(userId, projectId, ['OWNER', 'ADMIN']);
    const existing = await this.prisma.case.findFirst({ where: { id: caseId, projectId } });
    if (!existing) throw new NotFoundException('Kayıt bulunamadı');
    return this.prisma.case.delete({ where: { id: caseId } });
  }

  private caseIncludes() {
    return {
      assignee: {
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      },
      createdBy: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { updates: true } },
    };
  }

  async checkMemberAccess(userId: string, projectId: string, roles?: string[]) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member) throw new ForbiddenException('Bu projeye erişim yetkiniz yok');
    if (roles && !roles.includes(member.role)) {
      throw new ForbiddenException('Bu işlem için yetkiniz yok');
    }
    return member;
  }
}
