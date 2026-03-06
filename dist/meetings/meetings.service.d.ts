import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';
export declare class MeetingsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, projectId: string, dto: CreateMeetingDto): Promise<{
        createdBy: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
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
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    })[]>;
    findOne(userId: string, projectId: string, meetingId: string): Promise<{
        cases: ({
            case: {
                id: string;
                title: string;
                status: import(".prisma/client").$Enums.CaseStatus;
                priority: import(".prisma/client").$Enums.CasePriority;
            };
        } & {
            caseId: string;
            meetingId: string;
        })[];
        createdBy: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    update(userId: string, projectId: string, meetingId: string, dto: UpdateMeetingDto): Promise<{
        createdBy: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    remove(userId: string, projectId: string, meetingId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        projectId: string;
        createdById: string;
        scheduledAt: Date;
        location: string | null;
    }>;
    private checkMemberAccess;
    private checkAdminAccess;
}
