import { CasesService } from './cases.service';
import { CreateCaseDto, UpdateCaseDto, FilterCaseDto } from './dto/case.dto';
export declare class CasesController {
    private casesService;
    constructor(casesService: CasesService);
    create(user: any, projectId: string, dto: CreateCaseDto): Promise<{
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
            permissions: string[];
            joinedAt: Date;
            projectId: string;
        }) | null;
    } & {
        priority: import(".prisma/client").$Enums.CasePriority;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    findAll(user: any, projectId: string, filter: FilterCaseDto): Promise<({
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
            permissions: string[];
            joinedAt: Date;
            projectId: string;
        }) | null;
    } & {
        priority: import(".prisma/client").$Enums.CasePriority;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    })[]>;
    findOne(user: any, projectId: string, id: string): Promise<{
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
            permissions: string[];
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
        priority: import(".prisma/client").$Enums.CasePriority;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    update(user: any, projectId: string, id: string, dto: UpdateCaseDto): Promise<{
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
            permissions: string[];
            joinedAt: Date;
            projectId: string;
        }) | null;
    } & {
        priority: import(".prisma/client").$Enums.CasePriority;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
    remove(user: any, projectId: string, id: string): Promise<{
        priority: import(".prisma/client").$Enums.CasePriority;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        status: import(".prisma/client").$Enums.CaseStatus;
        dueDate: Date | null;
        closedAt: Date | null;
        createdById: string;
        assigneeId: string | null;
    }>;
}
