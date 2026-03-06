import { MeetingsService } from './meetings.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';
export declare class MeetingsController {
    private meetingsService;
    constructor(meetingsService: MeetingsService);
    create(user: any, projectId: string, dto: CreateMeetingDto): Promise<{
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
    findAll(user: any, projectId: string): Promise<({
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
    findOne(user: any, projectId: string, id: string): Promise<{
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
    update(user: any, projectId: string, id: string, dto: UpdateMeetingDto): Promise<{
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
    remove(user: any, projectId: string, id: string): Promise<{
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
}
