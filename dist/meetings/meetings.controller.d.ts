import { MeetingsService } from './meetings.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';
export declare class MeetingsController {
    private meetingsService;
    constructor(meetingsService: MeetingsService);
    create(user: any, projectId: string, dto: CreateMeetingDto): Promise<{
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        scheduledAt: Date;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        location: string | null;
    }>;
    findAll(user: any, projectId: string): Promise<({
        _count: {
            cases: number;
        };
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        scheduledAt: Date;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        location: string | null;
    })[]>;
    findOne(user: any, projectId: string, id: string): Promise<{
        cases: ({
            case: {
                title: string;
                id: string;
                status: import(".prisma/client").$Enums.CaseStatus;
                priority: import(".prisma/client").$Enums.CasePriority;
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
        scheduledAt: Date;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        location: string | null;
    }>;
    update(user: any, projectId: string, id: string, dto: UpdateMeetingDto): Promise<{
        createdBy: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        scheduledAt: Date;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        location: string | null;
    }>;
    remove(user: any, projectId: string, id: string): Promise<{
        scheduledAt: Date;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        projectId: string;
        createdById: string;
        location: string | null;
    }>;
}
