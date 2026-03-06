import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { MembersService } from './members.service';
import { InviteMemberDto, UpdateMemberDto } from './dto/member.dto';

@ApiTags('Members')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Post()
  @ApiOperation({ summary: 'Projeye üye davet et' })
  invite(@CurrentUser() user: any, @Param('projectId') projectId: string, @Body() dto: InviteMemberDto) {
    return this.membersService.invite(user.id, projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Proje üyelerini listele' })
  findAll(@CurrentUser() user: any, @Param('projectId') projectId: string) {
    return this.membersService.findAll(user.id, projectId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Üye rolü/unvanı güncelle' })
  update(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string, @Body() dto: UpdateMemberDto) {
    return this.membersService.update(user.id, projectId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Üyeyi projeden çıkar' })
  remove(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string) {
    return this.membersService.remove(user.id, projectId, id);
  }
}
