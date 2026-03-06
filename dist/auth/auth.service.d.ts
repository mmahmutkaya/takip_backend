import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from '../mail/mail.service';
import { RegisterDto, LoginDto, ResendVerificationDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private mailService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService, mailService: MailService);
    register(dto: RegisterDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatarUrl: string | null;
            isActive: boolean;
            isEmailVerified: boolean;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            planExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            name: string;
            avatarUrl: string | null;
            isActive: boolean;
            isEmailVerified: boolean;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            planExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(refreshToken: string): Promise<void>;
    private sendVerificationToken;
    private generateTokens;
}
