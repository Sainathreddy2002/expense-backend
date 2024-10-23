import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilteredTransactions } from './dto/get-filtered-transactions.dto';
import * as dayjs from 'dayjs';
@Injectable()
export class TransactionService {
  private readonly logger = new Logger(TransactionService.name);
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTransactionDto: CreateTransactionDTO) {
    return this.databaseService.transaction.create({
      data: {
        amount: createTransactionDto.amount,
        type: createTransactionDto.type,
        description: createTransactionDto.description,
        category: createTransactionDto.category,
        userId: createTransactionDto.userId,
        date: createTransactionDto.date,
        name: createTransactionDto.name,
      },
    });
  }

  findAll() {
    return this.databaseService.transaction.findMany();
  }

  findOne(id: number) {
    return this.databaseService.transaction.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }
  async findUserTransactions(userId: number) {
    console.log(userId);
    const transactions = await this.databaseService.transaction.findMany({
      where: {
        userId,
      },
    });
    if (!transactions) throw new NotFoundException('No transactions found');
    return 'Cool';
  }
  update(updateTransactionDto: UpdateTransactionDto) {
    return this.databaseService.transaction.update({
      where: {
        id: updateTransactionDto?.id,
      },
      data: {
        amount: updateTransactionDto.amount,
        type: updateTransactionDto.type,
        description: updateTransactionDto.description,
        category: updateTransactionDto.category,
        userId: updateTransactionDto.userId,
        date: updateTransactionDto.date,
        name: updateTransactionDto.name,
      },
    });
  }

  remove(id: number) {
    const deletedTransaction = this.databaseService.transaction.delete({
      where: {
        id,
      },
    });
    if (!deletedTransaction)
      throw new NotFoundException(
        'No Transaction Found for this Transaction Id',
      );
    return deletedTransaction;
  }
  async getFilteredTransaction(filteredTransactions: FilteredTransactions) {
    const totalRecords = await this.databaseService.transaction.count({
      where: {
        userId: filteredTransactions.userId,
      },
    });
    if (filteredTransactions?.page > Math.ceil(totalRecords / 10))
      throw new NotFoundException('This page does not exist');
    let filteredValues = [];
    if (totalRecords > 0) {
      filteredValues = await this.databaseService.transaction.findMany({
        where: {
          userId: filteredTransactions.userId,
          ...(filteredTransactions?.status && {
            type: filteredTransactions.status,
          }),
          ...(filteredTransactions.search && {
            OR: [
              {
                name: {
                  contains: filteredTransactions.search,
                  mode: 'insensitive',
                },
              },
              {
                category: {
                  contains: filteredTransactions.search,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: filteredTransactions.search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },

        skip: (filteredTransactions.page - 1) * 10,
        take: 10,
      });
    }
    return { total: totalRecords, transactions: filteredValues };
  }

  async getNetValue(id: number, month: string) {
    const startOfMonth = dayjs(month).startOf('month').toDate();
    const endOfMonth = dayjs(month).endOf('month').toDate();
    const income = await this.databaseService.transaction.aggregate({
      where: {
        userId: id,
        type: 'INCOME',
        date: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });
    const expense = await this.databaseService.transaction.aggregate({
      where: {
        userId: id,
        type: 'EXPENSE',
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        amount: true,
      },
    });
    return { expense: expense._sum.amount, income: income._sum.amount };
  }
  async getDashboardDataByMonth(id: number, month: string) {
    const startOfMonth = dayjs(month).startOf('month').toDate();
    const endOfMonth = dayjs(month).endOf('month').toDate();
    const transactions = await this.databaseService.transaction.groupBy({
      by: ['date', 'type'], // Group by date and type
      where: {
        userId: id,
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        amount: true, // Sum the amount for each group
      },
    });
    // const modifiedData = transactions?.map((item) => {
    //   return {
    //     name: dayjs(item?.date).format('MMM DD'),
    //     expense: item.type === TRANSACTION_TYPE.EXPENSE ? item? : 0,
    //     income: item.type === TRANSACTION_TYPE.INCOME ? item?.amount : 0,
    //   };
    // });
    const results = transactions.reduce((acc, transaction) => {
      const date = dayjs(transaction.date).format('MMM DD');

      // Check if the date already exists in the accumulator
      if (!acc[date]) {
        acc[date] = { date, income: 0, expense: 0 };
      }

      // Distinguish between income and expenses based on transaction type
      if (transaction.type === 'INCOME') {
        acc[date].income += transaction._sum.amount; // Add the sum to income
      } else if (transaction.type === 'EXPENSE') {
        acc[date].expense += transaction._sum.amount; // Add the sum to expense
      }

      return acc;
    }, {});
    return Object.values(results);
  }
}
