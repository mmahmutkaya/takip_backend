import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';
export declare class MeetingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, projectId: string, dto: CreateMeetingDto): Promise<{
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    findAll(userId: string, projectId: string): Promise<({
        _count: {
            cases: number;
        };
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    })[]>;
    findOne(userId: string, projectId: string, meetingId: string): Promise<{
        cases: ({
            case: {
                priority: import(".prisma/client").$Enums.CasePriority;
                title: string;
                id: string;
                status: import(".prisma/client").$Enums.CaseStatus;
            };
        } & {
            caseId: string;
            meetingId: string;
        })[];
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    update(userId: string, projectId: string, meetingId: string, dto: UpdateMeetingDto): Promise<{
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    remove(userId: string, projectId: string, meetingId: string): Promise<{
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    private checkMemberAccess;
    private checkAdminAccess;
}
