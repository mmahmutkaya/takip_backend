import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseUpdateDto } from './dto/case-update.dto';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class CaseUpdatesService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async create(userId: string, projectId: string, caseId: string, dto: CreateCaseUpdateDto) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member) throw new ForbiddenException('Bu projeye erişim yetkiniz yok');

    const caseItem = await this.prisma.case.findFirst({ where: { id: caseId, projectId } });
    if (!caseItem) throw new NotFoundException('Case bulunamadı');

    const update = await this.prisma.caseUpdate.create({
      data: { content: dto.content, caseId, authorId: userId },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
    });

    // Notify assignee if different from author
    if (caseItem.assigneeId) {
      const assignee = await this.prisma.projectMember.findUnique({
        where: { id: caseItem.assigneeId },
      });
      if (assignee && assignee.userId !== userId) {
        await this.notifications.create({
          recipientId: assignee.userId,
          type: 'CASE_UPDATED',
          message: `"${caseItem.title}" case'ine yeni bir güncelleme eklendi`,
          caseId,
          payload: { projectId },
        });
      }
    }

    return update;
  }

  async findAll(userId: string, projectId: string, caseId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member) throw new ForbiddenException('Bu projeye erişim yetkiniz yok');

    return this.prisma.caseUpdate.findMany({
      where: { caseId },
      include: { author: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async remove(userId: string, caseUpdateId: string) {
    const update = await this.prisma.caseUpdate.findUnique({
      where: { id: caseUpdateId },
    });
    if (!update) throw new NotFoundException('Güncelleme bulunamadı');
    if (update.authorId !== userId) throw new ForbiddenException('Sadece kendi güncellemenizi silebilirsiniz');
    return this.prisma.caseUpdate.delete({ where: { id: caseUpdateId } });
  }
}
