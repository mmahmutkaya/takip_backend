import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@ApiTags('Projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni proje oluştur' })
  create(@CurrentUser() user: any, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(user.id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Projelerimi listele' })
  findAll(@CurrentUser() user: any) {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Proje detayı' })
  findOne(@CurrentUser() user: any, @Param('id') id: string) {
    return this.projectsService.findOne(user.id, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Proje güncelle' })
  update(@CurrentUser() user: any, @Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Proje sil (pasife al)' })
  remove(@CurrentUser() user: any, @Param('id') id: string) {
    return this.projectsService.remove(user.id, id);
  }
}
