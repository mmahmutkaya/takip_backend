import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CasesService } from './cases.service';
import { CreateCaseDto, UpdateCaseDto, FilterCaseDto } from './dto/case.dto';

@ApiTags('Cases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects/:projectId/cases')
export class CasesController {
  constructor(private casesService: CasesService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni case oluştur' })
  create(@CurrentUser() user: any, @Param('projectId') projectId: string, @Body() dto: CreateCaseDto) {
    return this.casesService.create(user.id, projectId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Proje case lerini listele' })
  findAll(@CurrentUser() user: any, @Param('projectId') projectId: string, @Query() filter: FilterCaseDto) {
    return this.casesService.findAll(user.id, projectId, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Case detayı' })
  findOne(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string) {
    return this.casesService.findOne(user.id, projectId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Case güncelle / durum değiştir' })
  update(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string, @Body() dto: UpdateCaseDto) {
    return this.casesService.update(user.id, projectId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Case sil' })
  remove(@CurrentUser() user: any, @Param('projectId') projectId: string, @Param('id') id: string) {
    return this.casesService.remove(user.id, projectId, id);
  }
}
