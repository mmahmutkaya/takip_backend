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
        type: import(".prisma/client").$Enums.NotificationType;
        id: string;
        createdAt: Date;
        message: string;
        isRead: boolean;
        payload: import("@prisma/client/runtime/library").JsonValue | null;
        recipientId: string;
        caseId: string | null;
    }>;
    findAll(userId: string): Promise<({
        case: {
            title: string;
            id: string;
            projectId: string;
        } | null;
    } & {
        type: import(".prisma/client").$Enums.NotificationType;
        id: string;
        createdAt: Date;
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
