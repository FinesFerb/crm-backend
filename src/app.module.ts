import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DealModule } from './deal/deal.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { CommentModule } from './comment/comment.module';
import { StorageModule } from './storage/storage.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import Joi from 'joi';

@Global()
@Module({
  imports: [
    UserModule,
    DealModule,
    CustomerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        R2_REGION: Joi.string().required(),
        R2_ENDPOINT: Joi.string().required(),
        R2_ACCESS_KEY_ID: Joi.string().required(),
        R2_SECRET_ACCESS_KEY: Joi.string().required(),
        R2_BUCKET_NAME: Joi.string().required(),
        R2_PUBLIC_URL: Joi.string().required(),
      }),
    }),
    AuthModule,
    CommentModule,
    StorageModule,
  ],
  providers: [
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
