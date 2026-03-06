import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        avatarUrl: string | null;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        planExpiresAt: Date | null;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        name: string;
        avatarUrl: string | null;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        createdAt: Date;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
