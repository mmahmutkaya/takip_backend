import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'Bildirimlerimi listele' })
  findAll(@CurrentUser() user: any) {
    return this.notificationsService.findAll(user.id);
  }

  @Get('unread-count')
  @ApiOperation({ summary: 'Okunmamış bildirim sayısı' })
  unreadCount(@CurrentUser() user: any) {
    return this.notificationsService.getUnreadCount(user.id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Bildirimi okundu işaretle' })
  markRead(@CurrentUser() user: any, @Param('id') id: string) {
    return this.notificationsService.markRead(user.id, id);
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Tümünü okundu işaretle' })
  markAllRead(@CurrentUser() user: any) {
    return this.notificationsService.markAllRead(user.id);
  }
}
