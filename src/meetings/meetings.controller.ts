import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MeetingsService } from './meetings.service';
import { CreateMeetingDto, UpdateMeetingDto } from './dto/meeting.dto';

@ApiTags('Meetings')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/meetings')
export class MeetingsController {
  constructor(private meetingsService: MeetingsService) {}

  @Post()
  @ApiOperation({ summary: 'Toplantı oluştur' })
  create(@CurrentUser() user: any, @Param('projectId') projectId: string, @Body() dto: CreateMeetingDto) {
    return this.meetingsService.create(user.id, projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Toplantıları listele' })
  findAll(@CurrentUser() user: any, @Param('projectId') projectId: string) {
    return this.meetingsService.findAll(user.id, projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Toplantı detayı' })
  findOne(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string) {
    return this.meetingsService.findOne(user.id, projectId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Toplantı güncelle' })
  update(
    @CurrentUser() user: any,
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() dto: UpdateMeetingDto,
  ) {
    return this.meetingsService.update(user.id, projectId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Toplantı sil' })
  remove(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string) {
    return this.meetingsService.remove(user.id, projectId, id);
  }
}
