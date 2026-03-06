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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let MembersService = class MembersService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async invite(adminId, projectId, dto) {
        await this.checkAdminAccess(adminId, projectId);
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user)
            throw new common_1.NotFoundException('Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı');
        const existing = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId: user.id } },
        });
        if (existing)
            throw new common_1.ConflictException('Kullanıcı zaten bu projenin üyesi');
        const member = await this.prisma.projectMember.create({
            data: { projectId, userId: user.id, role: dto.role ?? 'MEMBER', title: dto.title },
            include: { user: { select: { id: true, name: true, email: true } } },
        });
        await this.notifications.create({
            recipientId: user.id,
            type: 'MEMBER_ADDED',
            message: 'Bir projeye davet edildiniz',
            payload: { projectId },
        });
        return member;
    }
    async findAll(userId, projectId) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member)
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        return this.prisma.projectMember.findMany({
            where: { projectId },
            include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
        });
    }
    async update(adminId, projectId, memberId, dto) {
        await this.checkAdminAccess(adminId, projectId);
        const member = await this.prisma.projectMember.findFirst({
            where: { id: memberId, projectId },
        });
        if (!member)
            throw new common_1.NotFoundException('Üye bulunamadı');
        if (member.role === 'OWNER')
            throw new common_1.ForbiddenException('Proje sahibinin rolü değiştirilemez');
        return this.prisma.projectMember.update({ where: { id: memberId }, data: dto });
    }
    async remove(adminId, projectId, memberId) {
        await this.checkAdminAccess(adminId, projectId);
        const member = await this.prisma.projectMember.findFirst({
            where: { id: memberId, projectId },
        });
        if (!member)
            throw new common_1.NotFoundException('Üye bulunamadı');
        if (member.role === 'OWNER')
            throw new common_1.ForbiddenException('Proje sahibi projeden çıkarılamaz');
        return this.prisma.projectMember.delete({ where: { id: memberId } });
    }
    async checkAdminAccess(userId, projectId) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member || (member.role !== 'OWNER' && member.role !== 'ADMIN')) {
            throw new common_1.ForbiddenException('Bu işlem için yetkiniz yok');
        }
        return member;
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], MembersService);
//# sourceMappingURL=members.service.js.map