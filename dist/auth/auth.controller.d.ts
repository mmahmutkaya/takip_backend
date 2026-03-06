import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto, VerifyEmailDto, ResendVerificationDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
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
            isEmailVerified: boolean;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            planExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        message: string;
    }>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            name: string;
            email: string;
            id: string;
            avatarUrl: string | null;
            isActive: boolean;
            isEmailVerified: boolean;
            plan: import(".prisma/client").$Enums.SubscriptionPlan;
            planExpiresAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    logout(dto: RefreshTokenDto): Promise<void>;
}
