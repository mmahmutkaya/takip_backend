import { MeetingsService } from './meetings.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';
export declare class MeetingsController {
    private meetingsService;
    constructor(meetingsService: MeetingsService);
    create(user: any, projectId: string, dto: CreateMeetingDto): Promise<{
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
    findAll(user: any, projectId: string): Promise<({
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
    findOne(user: any, projectId: string, id: string): Promise<{
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
    update(user: any, projectId: string, id: string, dto: UpdateMeetingDto): Promise<{
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
    remove(user: any, projectId: string, id: string): Promise<{
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
}
