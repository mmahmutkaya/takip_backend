import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseUpdateDto } from './dto/case-update.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CaseUpdatesService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(userId: string, projectId: string, caseId: string, dto: CreateCaseUpdateDto): Promise<{
        author: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        content: string;
        authorId: string;
    }>;
    findAll(userId: string, projectId: string, caseId: string): Promise<({
        author: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        content: string;
        authorId: string;
    })[]>;
    remove(userId: string, caseUpdateId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        content: string;
        authorId: string;
    }>;
}
