import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateProjectDto): Promise<{
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
            joinedAt: Date;
            projectId: string;
        })[];
    } & {
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    findAll(userId: string): Promise<({
        _count: {
            members: number;
            cases: number;
        };
        members: {
            title: string | null;
            role: import(".prisma/client").$Enums.ProjectRole;
        }[];
    } & {
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    })[]>;
    findOne(userId: string, projectId: string): Promise<{
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
            joinedAt: Date;
            projectId: string;
        })[];
    } & {
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    update(userId: string, projectId: string, dto: UpdateProjectDto): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    remove(userId: string, projectId: string): Promise<{
        description: string | null;
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    }>;
    private checkAdminAccess;
    private checkOwnerAccess;
}
