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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProjectsService = class ProjectsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const existing = await this.prisma.project.findUnique({ where: { slug: dto.slug } });
        if (existing)
            throw new common_1.ConflictException('Bu slug zaten kullanımda');
        return this.prisma.project.create({
            data: {
                name: dto.name,
                description: dto.description,
                slug: dto.slug,
                members: {
                    create: { userId, role: 'OWNER', title: 'Proje Sahibi' },
                },
            },
            include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } },
        });
    }
    async findAll(userId) {
        return this.prisma.project.findMany({
            where: { members: { some: { userId } }, isActive: true },
            include: {
                _count: { select: { cases: true, members: true } },
                members: {
                    where: { userId },
                    select: { role: true, title: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(userId, projectId) {
        const project = await this.prisma.project.findFirst({
            where: { id: projectId, members: { some: { userId } }, isActive: true },
            include: {
                members: { include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } } },
                _count: { select: { cases: true } },
            },
        });
        if (!project)
            throw new common_1.NotFoundException('Proje bulunamadı');
        return project;
    }
    async update(userId, projectId, dto) {
        await this.checkAdminAccess(userId, projectId);
        if (dto.slug) {
            const existing = await this.prisma.project.findFirst({
                where: { slug: dto.slug, id: { not: projectId } },
            });
            if (existing)
                throw new common_1.ConflictException('Bu slug zaten kullanımda');
        }
        return this.prisma.project.update({ where: { id: projectId }, data: dto });
    }
    async remove(userId, projectId) {
        await this.checkOwnerAccess(userId, projectId);
        return this.prisma.project.update({ where: { id: projectId }, data: { isActive: false } });
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
    async checkOwnerAccess(userId, projectId) {
        const member = await this.prisma.projectMember.findUnique({
            where: { projectId_userId: { projectId, userId } },
        });
        if (!member || member.role !== 'OWNER') {
            throw new common_1.ForbiddenException('Bu işlem sadece proje sahibi tarafından yapılabilir');
        }
        return member;
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map