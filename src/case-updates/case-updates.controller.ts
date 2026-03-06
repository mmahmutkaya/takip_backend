import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CaseUpdatesService } from './case-updates.service';
import { CreateCaseUpdateDto } from './dto/case-update.dto';

@ApiTags('Case Updates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/cases/:caseId/updates')
export class CaseUpdatesController {
  constructor(private caseUpdatesService: CaseUpdatesService) {}

  @Post()
  @ApiOperation({ summary: 'Gelisme ekle' })
  create(
    @CurrentUser() user: any,
    @Param('projectId') projectId: string,
    @Param('caseId') caseId: string,
    @Body() dto: CreateCaseUpdateDto,
  ) {
    return this.caseUpdatesService.create(user.id, projectId, caseId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Gelismeleri listele' })
  findAll(
    @CurrentUser() user: any,
    @Param('projectId') projectId: string,
    @Param('caseId') caseId: string,
  ) {
    return this.caseUpdatesService.findAll(user.id, projectId, caseId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Gelisme sil' })
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.caseUpdatesService.remove(user.id, id);
  }
}
