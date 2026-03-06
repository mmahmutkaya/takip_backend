import { CaseStatus, CasePriority } from '@prisma/client';
export declare class CreateCaseDto {
    title: string;
    description?: string;
    priority?: CasePriority;
    dueDate?: string;
    assigneeId?: string;
}
declare const UpdateCaseDto_base: import("@nestjs/common").Type<Partial<CreateCaseDto>>;
export declare class UpdateCaseDto extends UpdateCaseDto_base {
    status?: CaseStatus;
}
export declare class FilterCaseDto {
    status?: CaseStatus;
    priority?: CasePriority;
    assigneeId?: string;
}
export {};
