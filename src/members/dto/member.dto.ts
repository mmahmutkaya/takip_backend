import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProjectRole } from '@prisma/client';

export class InviteMemberDto {
  @ApiProperty({ example: 'ahmet@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ enum: ProjectRole, default: ProjectRole.MEMBER })
  @IsOptional()
  @IsEnum(ProjectRole)
  role?: ProjectRole;

  @ApiPropertyOptional({ example: 'Yazilim Gelistirici' })
  @IsOptional()
  @IsString()
  title?: string;
}

export class UpdateMemberDto {
  @ApiPropertyOptional({ enum: ProjectRole })
  @IsOptional()
  @IsEnum(ProjectRole)
  role?: ProjectRole;

  @ApiPropertyOptional({ example: 'Kıdemli Gelistirici' })
  @IsOptional()
  @IsString()
  title?: string;
}
