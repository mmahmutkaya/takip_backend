import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';

interface CreateNotificationDto {
  recipientId: string;
  type: NotificationType;
  message: string;
  caseId?: string;
  payload?: Record<string, any>;
}

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        recipientId: dto.recipientId,
        type: dto.type,
        message: dto.message,
        caseId: dto.caseId,
        payload: dto.payload,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { recipientId: userId },
      include: { case: { select: { id: true, title: true, projectId: true } } },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async markRead(userId: string, notificationId: string) {
    return this.prisma.notification.updateMany({
      where: { id: notificationId, recipientId: userId },
      data: { isRead: true },
    });
  }

  async markAllRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: { recipientId: userId, isRead: false },
      data: { isRead: true },
    });
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: { recipientId: userId, isRead: false },
    });
    return { count };
  }
}
