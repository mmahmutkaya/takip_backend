import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Ali Veli' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'eskiSifre123' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ example: 'yeniSifre456' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}
