import { UsersService } from './users.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(user: any): Promise<{
        id: string;
        email: string;
        name: string;
        avatarUrl: string | null;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        planExpiresAt: Date | null;
        createdAt: Date;
    }>;
    updateProfile(user: any, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        name: string;
        avatarUrl: string | null;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        createdAt: Date;
    }>;
    changePassword(user: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
