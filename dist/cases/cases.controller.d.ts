import { CasesService } from './cases.service';
import { CreateCaseDto, UpdateCaseDto, FilterCaseDto } from './dto/case.dto';
export declare class CasesController {
    private casesService;
    constructor(casesService: CasesService);
    create(user: any, projectId: string, dto: CreateCaseDto): Promise<{
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
    findAll(user: any, projectId: string, filter: FilterCaseDto): Promise<({
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
    findOne(user: any, projectId: string, id: string): Promise<{
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
    update(user: any, projectId: string, id: string, dto: UpdateCaseDto): Promise<{
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
    remove(user: any, projectId: string, id: string): Promise<{
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
}
