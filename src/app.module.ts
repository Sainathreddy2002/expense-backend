import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, TransactionModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
