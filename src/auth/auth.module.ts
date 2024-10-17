import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use your JWT secret from env file
      signOptions: { expiresIn: '1h' }, // Adjust expiration as needed
    }),
  ],
})
export class AuthModule {}
