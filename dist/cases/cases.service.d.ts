import { PrismaService } from '../prisma/prisma.service';
import { CreateCaseDto, UpdateCaseDto, FilterCaseDto } from './dto/case.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class CasesService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    create(userId: string, projectId: string, dto: CreateCaseDto): Promise<{
        createdBy: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                id: string;
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            title: string | null;
            projectId: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            permissions: string[];
            joinedAt: Date;
        }) | null;
        _count: {
            updates: number;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        assigneeId: string | null;
    }>;
    findAll(userId: string, projectId: string, filter: FilterCaseDto): Promise<({
        createdBy: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                id: string;
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            title: string | null;
            projectId: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            permissions: string[];
            joinedAt: Date;
        }) | null;
        _count: {
            updates: number;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        assigneeId: string | null;
    })[]>;
    findOne(userId: string, projectId: string, caseId: string): Promise<{
        createdBy: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                id: string;
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            title: string | null;
            projectId: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            permissions: string[];
            joinedAt: Date;
        }) | null;
        updates: ({
            author: {
                id: string;
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            caseId: string;
            authorId: string;
        })[];
        _count: {
            updates: number;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        assigneeId: string | null;
    }>;
    update(userId: string, projectId: string, caseId: string, dto: UpdateCaseDto): Promise<{
        createdBy: {
            id: string;
            name: string;
            avatarUrl: string | null;
        };
        assignee: ({
            user: {
                id: string;
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            title: string | null;
            projectId: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            permissions: string[];
            joinedAt: Date;
        }) | null;
        _count: {
            updates: number;
        };
    } & {
        id: string;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        assigneeId: string | null;
    }>;
    remove(userId: string, projectId: string, caseId: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        status: import(".prisma/client").$Enums.CaseStatus;
        priority: import(".prisma/client").$Enums.CasePriority;
        dueDate: Date | null;
        closedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        assigneeId: string | null;
    }>;
    private caseIncludes;
    checkMemberAccess(userId: string, projectId: string, roles?: string[]): Promise<{
        id: string;
        title: string | null;
        projectId: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        permissions: string[];
        joinedAt: Date;
    }>;
}
