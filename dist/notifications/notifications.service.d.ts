import { PrismaService } from '../prisma/prisma.service';
import { NotificationType } from '@prisma/client';
interface CreateNotificationDto {
    recipientId: string;
    type: NotificationType;
    message: string;
    caseId?: string;
    payload?: Record<string, any>;
}
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateNotificationDto): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        recipientId: string;
        caseId: string | null;
    }>;
    findAll(userId: string): Promise<({
        case: {
            id: string;
            title: string;
            projectId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        message: string;
        isRead: boolean;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        recipientId: string;
        caseId: string | null;
    })[]>;
    markRead(userId: string, notificationId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAllRead(userId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUnreadCount(userId: string): Promise<{
        count: number;
    }>;
}
export {};
