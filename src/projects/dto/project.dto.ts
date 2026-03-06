import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({ example: 'ERP Projesi' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({ example: 'Şirket ERP sistemi geliştirme projesi' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({ example: 'erp-projesi' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug sadece küçük harf, rakam ve tire içerebilir' })
  slug: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
