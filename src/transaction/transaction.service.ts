import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
@Injectable()
export class TransactionService {
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
  update(id: number, updateTransactionDto: Prisma.TransactionUpdateInput) {
    return this.databaseService.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    });
  }

  remove(id: number) {
    return this.databaseService.transaction.delete({
      where: {
        id,
      },
    });
  }
}
