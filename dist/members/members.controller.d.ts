import { MembersService } from './members.service';
import { InviteMemberDto, UpdateMemberDto } from './dto/member.dto';
export declare class MembersController {
    private membersService;
    constructor(membersService: MembersService);
    invite(user: any, projectId: string, dto: InviteMemberDto): Promise<{
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
    findAll(user: any, projectId: string): Promise<({
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
    update(user: any, projectId: string, id: string, dto: UpdateMemberDto): Promise<{
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        title: string | null;
        permissions: string[];
        joinedAt: Date;
        projectId: string;
    }>;
    remove(user: any, projectId: string, id: string): Promise<{
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        title: string | null;
        permissions: string[];
        joinedAt: Date;
        projectId: string;
    }>;
}
