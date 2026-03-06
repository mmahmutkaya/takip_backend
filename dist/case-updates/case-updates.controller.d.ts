import { CaseUpdatesService } from './case-updates.service';
import { CreateCaseUpdateDto } from './dto/case-update.dto';
export declare class CaseUpdatesController {
    private caseUpdatesService;
    constructor(caseUpdatesService: CaseUpdatesService);
    create(user: any, projectId: string, caseId: string, dto: CreateCaseUpdateDto): Promise<{
        author: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        content: string;
        authorId: string;
    }>;
    findAll(user: any, projectId: string, caseId: string): Promise<({
        author: {
            name: string;
            id: string;
            avatarUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        content: string;
        authorId: string;
    })[]>;
    remove(user: any, id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        caseId: string;
        content: string;
        authorId: string;
    }>;
}
