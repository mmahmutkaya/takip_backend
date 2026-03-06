import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, avatarUrl: true, plan: true, planExpiresAt: true, createdAt: true },
    });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: { id: true, name: true, email: true, avatarUrl: true, plan: true, createdAt: true },
    });
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');

    const valid = await bcrypt.compare(dto.currentPassword, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Mevcut şifre hatalı');

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({ where: { id: userId }, data: { passwordHash } });
    return { message: 'Şifre başarıyla güncellendi' };
  }
}
