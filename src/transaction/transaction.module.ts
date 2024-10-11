import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [DatabaseModule],
})
export class TransactionModule {}
