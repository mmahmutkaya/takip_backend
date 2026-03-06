import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateMeetingDto {
  @ApiProperty({ example: 'Sprint Planning' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Q1 sprint planlaması' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2026-03-10T10:00:00.000Z' })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional({ example: 'Toplantı Odası 1 veya https://meet.google.com/xyz' })
  @IsOptional()
  @IsString()
  location?: string;
}

export class UpdateMeetingDto {
  @ApiPropertyOptional({ example: 'Sprint Planning' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ example: 'Q1 sprint planlaması' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: '2026-03-10T10:00:00.000Z' })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional({ example: 'Toplantı Odası 1 veya https://meet.google.com/xyz' })
  @IsOptional()
  @IsString()
  location?: string;
}
