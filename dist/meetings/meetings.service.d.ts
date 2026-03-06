import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';
export declare class MeetingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, projectId: string, dto: CreateMeetingDto): Promise<{
        createdBy: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        description: string | null;
        title: string;
        scheduledAt: Date;
        location: string | null;
        id: string;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
    findAll(userId: string, projectId: string): Promise<({
        createdBy: {
            id: string;
            name: string;
            email: string;
        };
        _count: {
            cases: number;
        };
    } & {
        description: string | null;
        title: string;
        scheduledAt: Date;
        location: string | null;
        id: string;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    })[]>;
    findOne(userId: string, projectId: string, meetingId: string): Promise<{
        createdBy: {
            id: string;
            name: string;
            email: string;
        };
        cases: ({
            case: {
                title: string;
                id: string;
                status: import(".prisma/client").$Enums.CaseStatus;
                priority: import(".prisma/client").$Enums.CasePriority;
            };
        } & {
            meetingId: string;
            caseId: string;
        })[];
    } & {
        description: string | null;
        title: string;
        scheduledAt: Date;
        location: string | null;
        id: string;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
    update(userId: string, projectId: string, meetingId: string, dto: UpdateMeetingDto): Promise<{
        createdBy: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        description: string | null;
        title: string;
        scheduledAt: Date;
        location: string | null;
        id: string;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
    remove(userId: string, projectId: string, meetingId: string): Promise<{
        description: string | null;
        title: string;
        scheduledAt: Date;
        location: string | null;
        id: string;
        projectId: string;
        createdAt: Date;
        updatedAt: Date;
        createdById: string;
    }>;
    private checkMemberAccess;
    private checkAdminAccess;
}
