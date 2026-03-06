import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCaseUpdateDto {
  @ApiProperty({ example: 'Sunucu logları incelendi, sorunu tespit ettim.' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
