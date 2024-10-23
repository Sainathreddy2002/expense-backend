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
import { FilteredTransactions } from './dto/get-filtered-transactions.dto';

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
  //Search and pagination for user transactions
  @Post('getFilteredTransactions')
  getFilteredTransactions(@Body() filteredTransactions: FilteredTransactions) {
    return this.transactionService.getFilteredTransaction(filteredTransactions);
  }
  //Find net of income ,expenses
  @Get('netTransactions/:id/:month')
  getNetValue(@Param('id') id: string, @Param('month') month: string) {
    return this.transactionService.getNetValue(+id, month);
  }
  //Dashboard data by month
  @Public()
  @Get('dashboard/:id/:month')
  getDashboardDataByMonth(
    @Param('id') id: string,
    @Param('month') month: string,
  ) {
    return this.transactionService.getDashboardDataByMonth(+id, month);
  }
}
