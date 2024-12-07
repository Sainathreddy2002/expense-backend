import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetCategoriesList {
  @ApiProperty({
    name: 'userId',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
  @ApiProperty({
    name: 'search',
    example: null,
  })
  @IsOptional()
  search?: string;
}
