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
import { ApiTags } from '@nestjs/swagger';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { Public } from 'src/auth/SkipAuth';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

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

  @Patch()
  update(@Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
