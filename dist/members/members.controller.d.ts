import { MembersService } from './members.service';
import { InviteMemberDto, UpdateMemberDto } from './dto/member.dto';
export declare class MembersController {
    private membersService;
    constructor(membersService: MembersService);
    invite(user: any, projectId: string, dto: InviteMemberDto): Promise<{
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
    }>;
    findAll(user: any, projectId: string): Promise<({
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
    })[]>;
    update(user: any, projectId: string, id: string, dto: UpdateMemberDto): Promise<{
        title: string | null;
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        permissions: string[];
        joinedAt: Date;
        projectId: string;
    }>;
    remove(user: any, projectId: string, id: string): Promise<{
        title: string | null;
        id: string;
        userId: string;
        role: import(".prisma/client").$Enums.ProjectRole;
        permissions: string[];
        joinedAt: Date;
        projectId: string;
    }>;
}
