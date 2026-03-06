import { UsersService } from './users.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getMe(user: any): Promise<{
        name: string;
        avatarUrl: string | null;
        id: string;
        email: string;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        planExpiresAt: Date | null;
        createdAt: Date;
    }>;
    updateProfile(user: any, dto: UpdateProfileDto): Promise<{
        name: string;
        avatarUrl: string | null;
        id: string;
        email: string;
        plan: import(".prisma/client").$Enums.SubscriptionPlan;
        createdAt: Date;
    }>;
    changePassword(user: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
