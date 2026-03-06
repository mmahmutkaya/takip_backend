import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsController {
    private projectsService;
    constructor(projectsService: ProjectsService);
    create(user: any, dto: CreateProjectDto): Promise<{
        members: ({
            user: {
                name: string;
                email: string;
                id: string;
            };
        } & {
            title: string | null;
            id: string;
            userId: string;
            role: import(".prisma/client").$Enums.ProjectRole;
            permissions: string[];
            joinedAt: Date;
            projectId: string;
        })[];
    } & {
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    findAll(user: any): Promise<({
        _count: {
            members: number;
            cases: number;
        };
        members: {
            title: string | null;
            role: import(".prisma/client").$Enums.ProjectRole;
        }[];
    } & {
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    })[]>;
    findOne(user: any, id: string): Promise<{
        _count: {
            cases: number;
        };
        members: ({
            user: {
                name: string;
                email: string;
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
        })[];
    } & {
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    update(user: any, id: string, dto: UpdateProjectDto): Promise<{
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    remove(user: any, id: string): Promise<{
        name: string;
        description: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
}
