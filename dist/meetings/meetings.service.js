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
exports.MeetingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MeetingsService = class MeetingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, projectId, dto) {
        await this.checkMemberAccess(userId, projectId);
        return this.prisma.meeting.create({
            data: {
                ...dto,
                scheduledAt: new Date(dto.scheduledAt),
                projectId,
                createdById: userId,
            },
            include: {
                createdBy: { select: { id: true, name: true, email: true } },
            },
        });
    }
    async findAll(userId, projectId) {
        await this.checkMemberAccess(userId, projectId);
        return this.prisma.meeting.findMany({
            where: { projectId },
            include: {
                createdBy: { select: { id: true, name: true, email: true } },
                _count: { select: { cases: true } },
            },
            orderBy: { scheduledAt: 'asc' },
        });
    }
    async findOne(userId, projectId, meetingId) {
        await this.checkMemberAccess(userId, projectId);
        const meeting = await this.prisma.meeting.findFirst({
            where: { id: meetingId, projectId },
            include: {
                createdBy: { select: { id: true, name: true, email: true } },
                cases: {
                    include: {
                        case: { select: { id: true, title: true, status: true, priority: true } },
                    },
                },
            },
        });
        if (!meeting)
            throw new common_1.NotFoundException('Toplantı bulunamadı');
        return meeting;
    }
    async update(userId, projectId, meetingId, dto) {
        await this.checkAdminAccess(userId, projectId);
        const meeting = await this.prisma.meeting.findFirst({ where: { id: meetingId, projectId } });
        if (!meeting)
            throw new common_1.NotFoundException('Toplantı bulunamadı');
        return this.prisma.meeting.update({
            where: { id: meetingId },
            data: {
                title: dto.title,
                description: dto.description,
                location: dto.location,
                ...(dto.scheduledAt ? { scheduledAt: new Date(dto.scheduledAt) } : {}),
            },
            include: { createdBy: { select: { id: true, name: true, email: true } } },
        });
    }
    async remove(userId, projectId, meetingId) {
        await this.checkAdminAccess(userId, projectId);
        const meeting = await this.prisma.meeting.findFirst({ where: { id: meetingId, projectId } });
        if (!meeting)
            throw new common_1.NotFoundException('Toplantı bulunamadı');
        return this.prisma.meeting.delete({ where: { id: meetingId } });
    }
    async checkMemberAccess(userId, projectId) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member)
            throw new common_1.ForbiddenException('Bu projeye erişim yetkiniz yok');
        return member;
    }
    async checkAdminAccess(userId, projectId) {
        const member = await this.checkMemberAccess(userId, projectId);
        if (member.role !== 'OWNER' && member.role !== 'ADMIN') {
            throw new common_1.ForbiddenException('Bu işlem için yetkiniz yok');
        }
        return member;
    }
};
exports.MeetingsService = MeetingsService;
exports.MeetingsService = MeetingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MeetingsService);
//# sourceMappingURL=meetings.service.js.map