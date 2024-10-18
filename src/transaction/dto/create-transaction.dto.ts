import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Prisma, TRANSACTION_TYPE } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTransactionDTO implements Prisma.TransactionCreateInput {
  @ApiProperty({
    example: 'Transaction Name',
    description: 'Name of the transaction',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    example: 150.75,
    description: 'The amount of the transaction',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
  @ApiProperty({
    example: 'EXPENSE', // or 'INCOME'
    description: 'The type of the transaction',
  })
  @IsNotEmpty()
  type: TRANSACTION_TYPE; // Use the imported enum
  @ApiProperty({
    example: 'Weekly grocery shopping',
    description: 'A brief description of the transaction',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
  @ApiProperty({
    example: 'Groceries',
    description: 'The category of the transaction',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;
  @ApiProperty({
    example: 1, // Replace with the actual user ID
    description: 'The ID of the user associated with this transaction',
  })
  @IsNotEmpty()
  userId: number;
  @ApiProperty({
    example: 'exmp date', // Replace with the actual user ID
    description: 'The date of the user associated with this transaction',
  })
  @IsNotEmpty()
  date: Date; // Required to link to the user

  // Remove the user property from here, since it's implied by userId
  user: Prisma.UserCreateNestedOneWithoutTransactionsInput; // Remove this line
}
