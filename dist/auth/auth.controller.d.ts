import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    refresh(dto: RefreshTokenDto): Promise<{
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
    logout(dto: RefreshTokenDto): Promise<void>;
}
