import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Profilimi getir' })
  getMe(@CurrentUser() user: any) {
    return this.usersService.getMe(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Profilimi güncelle' })
  updateProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Şifre değiştir' })
  changePassword(@CurrentUser() user: any, @Body() dto: ChangePasswordDto) {
    return this.usersService.changePassword(user.id, dto);
  }
}
