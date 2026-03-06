import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateProjectDto): Promise<{
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
    findAll(userId: string): Promise<({
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
    findOne(userId: string, projectId: string): Promise<{
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
    update(userId: string, projectId: string, dto: UpdateProjectDto): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
    remove(userId: string, projectId: string): Promise<{
        id: string;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
    }>;
    private checkAdminAccess;
    private checkOwnerAccess;
}
