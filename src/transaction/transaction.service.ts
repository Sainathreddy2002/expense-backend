import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class TransactionService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTransactionDto: Prisma.TransactionCreateInput) {
    return this.databaseService.transaction.create({
      data: createTransactionDto,
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
