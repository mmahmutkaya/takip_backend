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
exports.CaseUpdatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let CaseUpdatesService = class CaseUpdatesService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async create(userId, projectId, caseId, dto) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member)
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        const caseItem = await this.prisma.case.findFirst({ where: { id: caseId, projectId } });
        if (!caseItem)
            throw new common_1.NotFoundException('Case bulunamadı');
        const update = await this.prisma.caseUpdate.create({
            data: { content: dto.content, caseId, authorId: userId },
            include: { author: { select: { id: true, name: true, avatarUrl: true } } },
        });
        if (caseItem.assigneeId) {
            const assignee = await this.prisma.projectMember.findUnique({
                where: { id: caseItem.assigneeId },
            });
            if (assignee && assignee.userId !== userId) {
                await this.notifications.create({
                    recipientId: assignee.userId,
                    type: 'CASE_UPDATED',
                    message: `"${caseItem.title}" case'ine yeni bir güncelleme eklendi`,
                    caseId,
                    payload: { projectId },
                });
            }
        }
        return update;
    }
    async findAll(userId, projectId, caseId) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member)
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        return this.prisma.caseUpdate.findMany({
            where: { caseId },
            include: { author: { select: { id: true, name: true, avatarUrl: true } } },
            orderBy: { createdAt: 'asc' },
        });
    }
    async remove(userId, caseUpdateId) {
        const update = await this.prisma.caseUpdate.findUnique({
            where: { id: caseUpdateId },
        });
        if (!update)
            throw new common_1.NotFoundException('Güncelleme bulunamadı');
        if (update.authorId !== userId)
            throw new common_1.ForbiddenException('Sadece kendi güncellemenizi silebilirsiniz');
        return this.prisma.caseUpdate.delete({ where: { id: caseUpdateId } });
    }
};
exports.CaseUpdatesService = CaseUpdatesService;
exports.CaseUpdatesService = CaseUpdatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], CaseUpdatesService);
//# sourceMappingURL=case-updates.service.js.map