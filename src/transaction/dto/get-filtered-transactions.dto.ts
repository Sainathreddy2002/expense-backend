import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TRANSACTION_TYPE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
  TRANSFER = 'TRANSFER',
}
export class FilteredTransactions {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @ApiProperty({
    example: 'something',
  })
  @IsOptional()
  @IsString()
  search: string | null;
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  page: number;
  @ApiProperty({
    example: 'EXPENSE',
  })
  @IsEnum(TransactionType)
  @IsOptional()
  status: TRANSACTION_TYPE | null;
}
