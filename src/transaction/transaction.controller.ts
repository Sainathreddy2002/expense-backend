import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Public } from 'src/auth/SkipAuth';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDTO) {
    return this.transactionService.create(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }
  @Public()
  @Get(':userId')
  findUserTransactions(@Query('userId') userId: string) {
    console.log(userId);
    return this.transactionService.findUserTransactions(+userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: Prisma.TransactionUpdateInput,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
