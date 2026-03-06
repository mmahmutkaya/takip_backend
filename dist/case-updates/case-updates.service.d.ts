import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseUpdateDto } from './dto/case-update.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CaseUpdatesService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(userId: string, projectId: string, caseId: string, dto: CreateCaseUpdateDto): Promise<{
        author: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        authorId: string;
    }>;
    findAll(userId: string, projectId: string, caseId: string): Promise<({
        author: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        authorId: string;
    })[]>;
    remove(userId: string, caseUpdateId: string): Promise<{
        id: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        authorId: string;
    }>;
}
