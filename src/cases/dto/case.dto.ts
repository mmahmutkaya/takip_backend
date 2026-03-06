import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CaseStatus, CasePriority } from '@prisma/client';

export class CreateCaseDto {
  @ApiProperty({ example: 'Login sayfası yavaş açılıyor' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ enum: CasePriority, default: CasePriority.MEDIUM })
  @IsOptional()
  @IsEnum(CasePriority)
  priority?: CasePriority;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({ description: 'ProjectMember ID (sorumlu)' })
  @IsOptional()
  @IsString()
  assigneeId?: string;
}

export class UpdateCaseDto extends PartialType(CreateCaseDto) {
  @ApiPropertyOptional({ enum: CaseStatus })
  @IsOptional()
  @IsEnum(CaseStatus)
  status?: CaseStatus;
}

export class FilterCaseDto {
  @IsOptional()
  @IsEnum(CaseStatus)
  status?: CaseStatus;

  @IsOptional()
  @IsEnum(CasePriority)
  priority?: CasePriority;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
