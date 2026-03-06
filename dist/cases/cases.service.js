"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CasesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let CasesService = class CasesService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async create(userId, projectId, dto) {
        await this.checkMemberAccess(userId, projectId, ['OWNER', 'ADMIN', 'MEMBER']);
        const caseItem = await this.prisma.case.create({
            data: {
                title: dto.title,
                description: dto.description,
                priority: dto.priority,
                dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
                projectId,
                createdById: userId,
                assigneeId: dto.assigneeId,
            },
            include: this.caseIncludes(),
        });
        if (dto.assigneeId && caseItem.assignee) {
            await this.notifications.create({
                recipientId: caseItem.assignee.userId,
                type: 'CASE_ASSIGNED',
                message: `Size "${caseItem.title}" kaydı atandı`,
                caseId: caseItem.id,
                payload: { projectId },
            });
        }
        return caseItem;
    }
    async findAll(userId, projectId, filter) {
        await this.checkMemberAccess(userId, projectId);
        return this.prisma.case.findMany({
            where: {
                projectId,
                ...(filter.status && { status: filter.status }),
                ...(filter.priority && { priority: filter.priority }),
                ...(filter.assigneeId && { assigneeId: filter.assigneeId }),
            },
            include: this.caseIncludes(),
            orderBy: [{ status: 'asc' }, { priority: 'desc' }, { createdAt: 'desc' }],
        });
    }
    async findOne(userId, projectId, caseId) {
        await this.checkMemberAccess(userId, projectId);
        const caseItem = await this.prisma.case.findFirst({
            where: { id: caseId, projectId },
            include: {
                ...this.caseIncludes(),
                updates: {
                    include: { author: { select: { id: true, name: true, avatarUrl: true } } },
                    orderBy: { createdAt: 'asc' },
                },
            },
        });
        if (!caseItem)
            throw new common_1.NotFoundException('Kayıt bulunamadı');
        return caseItem;
    }
    async update(userId, projectId, caseId, dto) {
        await this.checkMemberAccess(userId, projectId, ['OWNER', 'ADMIN', 'MEMBER']);
        const existing = await this.prisma.case.findFirst({ where: { id: caseId, projectId } });
        if (!existing)
            throw new common_1.NotFoundException('Kayıt bulunamadı');
        const data = { ...dto };
        if (dto.dueDate)
            data.dueDate = new Date(dto.dueDate);
        if (dto.status === 'CLOSED')
            data.closedAt = new Date();
        if (dto.status && dto.status !== 'CLOSED')
            data.closedAt = null;
        const updated = await this.prisma.case.update({
            where: { id: caseId },
            data,
            include: this.caseIncludes(),
        });
        if (dto.assigneeId && dto.assigneeId !== existing.assigneeId && updated.assignee) {
            await this.notifications.create({
                recipientId: updated.assignee.userId,
                type: 'CASE_ASSIGNED',
                message: `Size "${updated.title}" kaydı atandı`,
                caseId: updated.id,
                payload: { projectId },
            });
        }
        return updated;
    }
    async remove(userId, projectId, caseId) {
        await this.checkMemberAccess(userId, projectId, ['OWNER', 'ADMIN']);
        const existing = await this.prisma.case.findFirst({ where: { id: caseId, projectId } });
        if (!existing)
            throw new common_1.NotFoundException('Kayıt bulunamadı');
        return this.prisma.case.delete({ where: { id: caseId } });
    }
    caseIncludes() {
        return {
            assignee: {
                include: { user: { select: { id: true, name: true, avatarUrl: true } } },
            },
            createdBy: { select: { id: true, name: true, avatarUrl: true } },
            _count: { select: { updates: true } },
        };
    }
    async checkMemberAccess(userId, projectId, roles) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member)
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        if (roles && !roles.includes(member.role)) {
            throw new common_1.ForbiddenException('Bu işlem için yetkiniz yok');
        }
        return member;
    }
};
exports.CasesService = CasesService;
exports.CasesService = CasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], CasesService);
//# sourceMappingURL=cases.service.js.map