import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            email: string;
            id: string;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            createdAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            email: string;
            id: string;
            avatarUrl: string | null;
            isActive: boolean;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            planExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            email: string;
            id: string;
            avatarUrl: string | null;
            isActive: boolean;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            planExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(refreshToken: string): Promise<void>;
    private generateTokens;
}
