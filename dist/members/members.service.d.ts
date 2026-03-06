import { PrismaService } from '../prisma/prisma.service';
import { InviteMemberDto, UpdateMemberDto } from './dto/member.dto';
import { NotificationsService } from '../notifications/notifications.service';
export declare class MembersService {
    private prisma;
    private notifications;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    invite(adminId: string, projectId: string, dto: InviteMemberDto): Promise<{
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
    }>;
    findAll(userId: string, projectId: string): Promise<({
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
    })[]>;
    update(adminId: string, projectId: string, memberId: string, dto: UpdateMemberDto): Promise<{
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        title: string | null;
        permissions: string[];
        joinedAt: Date;
        projectId: string;
    }>;
    remove(adminId: string, projectId: string, memberId: string): Promise<{
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        title: string | null;
        permissions: string[];
        joinedAt: Date;
        projectId: string;
    }>;
    private checkAdminAccess;
}
