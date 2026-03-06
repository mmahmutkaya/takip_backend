import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseDto, UpdateCaseDto, FilterCaseDto } from './dto/case.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CasesService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(userId: string, projectId: string, dto: CreateCaseDto): Promise<{
        _count: {
            updates: number;
        };
        createdBy: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                name: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            title: string | null;
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            joinedAt: Date;
            projectId: string;
        }) | null;
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    findAll(userId: string, projectId: string, filter: FilterCaseDto): Promise<({
        _count: {
            updates: number;
        };
        createdBy: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                name: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            title: string | null;
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            joinedAt: Date;
            projectId: string;
        }) | null;
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    })[]>;
    findOne(userId: string, projectId: string, caseId: string): Promise<{
        _count: {
            updates: number;
        };
        createdBy: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                name: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            title: string | null;
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            joinedAt: Date;
            projectId: string;
        }) | null;
        updates: ({
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
        })[];
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    update(userId: string, projectId: string, caseId: string, dto: UpdateCaseDto): Promise<{
        _count: {
            updates: number;
        };
        createdBy: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                name: string;
                id: string;
                avatarUrl: string | null;
            };
        } & {
            title: string | null;
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            joinedAt: Date;
            projectId: string;
        }) | null;
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    remove(userId: string, projectId: string, caseId: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    private caseIncludes;
    checkMemberAccess(userId: string, projectId: string, roles?: string[]): Promise<{
        title: string | null;
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        joinedAt: Date;
        projectId: string;
    }>;
}
