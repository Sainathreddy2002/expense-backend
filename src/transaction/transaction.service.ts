import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateTransactionDTO } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
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
}
