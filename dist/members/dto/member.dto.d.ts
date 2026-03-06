import { ProjectRole } from '@prisma/client';
export declare class InviteMemberDto {
    email: string;
    role?: ProjectRole;
    title?: string;
}
export declare class UpdateMemberDto {
    role?: ProjectRole;
    title?: string;
}
