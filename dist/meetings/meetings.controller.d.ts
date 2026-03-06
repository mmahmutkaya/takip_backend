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
    findOne(user: any, projectId: string, id: string): Promise<{
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
    update(user: any, projectId: string, id: string, dto: UpdateMeetingDto): Promise<{
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
    remove(user: any, projectId: string, id: string): Promise<{
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
}
