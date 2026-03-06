import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ServiceUnavailableException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto, LoginDto, ResendVerificationDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private mailService: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Bu e-posta zaten kayıtlı');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, passwordHash, isEmailVerified: false },
      select: { id: true, name: true, email: true, plan: true, isEmailVerified: true, createdAt: true },
    });

    await this.sendVerificationToken(user.id, dto.email, dto.name);

    return { message: 'Kayıt başarılı. E-posta adresinize doğrulama linki gönderildi.' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Geçersiz e-posta veya şifre');
    }
    if (!user.isActive) throw new UnauthorizedException('Hesap devre dışı');
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('E-posta adresiniz henüz doğrulanmamış. Lütfen e-postanızı kontrol edin.');
    }

    const tokens = await this.generateTokens(user.id, user.email);
    const { passwordHash, ...safeUser } = user;
    return { user: safeUser, ...tokens };
  }

  async verifyEmail(token: string) {
    const record = await this.prisma.emailVerification.findUnique({ where: { token } });
    if (!record) throw new BadRequestException('Geçersiz doğrulama linki');
    if (record.expiresAt < new Date()) {
      await this.prisma.emailVerification.delete({ where: { id: record.id } });
      throw new BadRequestException('Doğrulama linkinin süresi dolmuş. Yeni link talep edin.');
    }

    await this.prisma.user.update({
      where: { id: record.userId },
      data: { isEmailVerified: true },
    });
    await this.prisma.emailVerification.delete({ where: { id: record.id } });

    return { message: 'E-posta adresiniz başarıyla doğrulandı. Giriş yapabilirsiniz.' };
  }

  async resendVerification(dto: ResendVerificationDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new NotFoundException('Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı');
    if (user.isEmailVerified) throw new ConflictException('E-posta adresi zaten doğrulanmış');

    await this.prisma.emailVerification.deleteMany({ where: { userId: user.id } });
    await this.sendVerificationToken(user.id, user.email, user.name);

    return { message: 'Doğrulama e-postası yeniden gönderildi.' };
  }

  async refresh(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });
    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Geçersiz refresh token');
    }
    await this.prisma.refreshToken.delete({ where: { id: stored.id } });
    const tokens = await this.generateTokens(stored.user.id, stored.user.email);
    const { passwordHash, ...safeUser } = stored.user;
    return { user: safeUser, ...tokens };
  }

  async logout(refreshToken: string) {
    await this.prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
  }

  private async sendVerificationToken(userId: string, email: string, name: string) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const verification = await this.prisma.emailVerification.create({ data: { token, userId, expiresAt } });

    try {
      await this.mailService.sendVerificationEmail(email, name, token);
    } catch (err) {
      this.logger.error(`Mail gönderilemedi [${email}]: ${(err as Error).message}`);
      await this.prisma.emailVerification.deleteMany({ where: { id: verification.id } });
      throw new ServiceUnavailableException(
        'Doğrulama e-postası gönderilemedi. Lütfen daha sonra tekrar deneyin.',
      );
    }
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const accessToken = this.jwtService.sign(payload);
    const refreshTokenValue = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      expiresIn: this.config.get('JWT_REFRESH_EXPIRES_IN'),
    });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await this.prisma.refreshToken.create({
      data: { token: refreshTokenValue, userId, expiresAt },
    });

    return { accessToken, refreshToken: refreshTokenValue };
  }
}
