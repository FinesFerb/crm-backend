import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DealModule } from './deal/deal.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { CommentModule } from './comment/comment.module';
import { StorageModule } from './storage/storage.module';

@Global()
@Module({
  imports: [
    UserModule,
    DealModule,
    CustomerModule,
    ConfigModule.forRoot(),
    AuthModule,
    CommentModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
