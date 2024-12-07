import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategoryDto implements Prisma.CategoriesCreateInput {
  @ApiProperty({
    example: 'RENT',
    description: 'Name of Category',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    example: 'house rent',
    description: 'description',
  })
  @IsNotEmpty()
  @IsString()
  description?: string;
  @ApiProperty({
    example: 1,
    description: 'user id',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
