import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(user: any): Promise<({
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
    unreadCount(user: any): Promise<{
        count: number;
    }>;
    markRead(user: any, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    markAllRead(user: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
