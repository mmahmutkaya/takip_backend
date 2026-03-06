import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';

@Injectable()
export class MeetingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, projectId: string, dto: CreateMeetingDto) {
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

  async findAll(userId: string, projectId: string) {
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

  async findOne(userId: string, projectId: string, meetingId: string) {
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
    if (!meeting) throw new NotFoundException('Toplantı bulunamadı');
    return meeting;
  }

  async update(userId: string, projectId: string, meetingId: string, dto: UpdateMeetingDto) {
    await this.checkAdminAccess(userId, projectId);
    const meeting = await this.prisma.meeting.findFirst({ where: { id: meetingId, projectId } });
    if (!meeting) throw new NotFoundException('Toplantı bulunamadı');

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

  async remove(userId: string, projectId: string, meetingId: string) {
    await this.checkAdminAccess(userId, projectId);
    const meeting = await this.prisma.meeting.findFirst({ where: { id: meetingId, projectId } });
    if (!meeting) throw new NotFoundException('Toplantı bulunamadı');
    return this.prisma.meeting.delete({ where: { id: meetingId } });
  }

  private async checkMemberAccess(userId: string, projectId: string) {
    const member = await this.prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId, userId } },
    });
    if (!member) throw new ForbiddenException('Bu projeye erişim yetkiniz yok');
    return member;
  }

  private async checkAdminAccess(userId: string, projectId: string) {
    const member = await this.checkMemberAccess(userId, projectId);
    if (member.role !== 'OWNER' && member.role !== 'ADMIN') {
      throw new ForbiddenException('Bu işlem için yetkiniz yok');
    }
    return member;
  }
}
