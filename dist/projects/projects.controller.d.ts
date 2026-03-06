import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    create(user: any, dto: CreateProjectDto): Promise<{
        members: ({
            user: {
                id: string;
                email: string;
                name: string;
            };
        } & {
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            title: string | null;
            permissions: string[];
            joinedAt: Date;
            projectId: string;
        })[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
    findAll(user: any): Promise<({
        _count: {
            members: number;
            cases: number;
        };
        members: {
            role: import(".prisma/client").$Enums.ProjectRole;
            title: string | null;
        }[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    })[]>;
    findOne(user: any, id: string): Promise<{
        _count: {
            cases: number;
        };
        members: ({
            user: {
                id: string;
                email: string;
                name: string;
                avatarUrl: string | null;
            };
        } & {
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            title: string | null;
            permissions: string[];
            joinedAt: Date;
            projectId: string;
        })[];
    } & {
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
    update(user: any, id: string, dto: UpdateProjectDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
    remove(user: any, id: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
}
