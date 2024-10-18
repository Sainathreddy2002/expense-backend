import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDTO } from './create-transaction.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateTransactionDto extends PartialType(CreateTransactionDTO) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
