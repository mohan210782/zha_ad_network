import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { configService } from './config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

import { AccounttypeModule } from './modules/accounttype/accounttype.module';

var winston = require('winston');
require('winston-daily-rotate-file');
import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { CommissionModule } from './modules/commission/commission.module';

//Define formatting for the Logger functionlaity
const logformat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike(),
);

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    WinstonModule.forRoot({ //imports the logger functionality
      //level: 'error',
      format: logformat,
      transports: [
        new winston.transports.DailyRotateFile({
          dirname: path.join(__dirname, './../logs/debug/'),
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          level: 'debug',
          silent: (configService.isProduction) ? true : false,
          maxSize: '20m',
          maxFiles: '2d'
        }),
        new winston.transports.DailyRotateFile({
          dirname: path.join(__dirname, './../logs/error/'),
          filename: 'error-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          level: 'error',
          maxSize: '20m',
          maxFiles: '2d'
        }),
        new winston.transports.DailyRotateFile({
          dirname: path.join(__dirname, './../logs/info/'),
          filename: 'info-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          level: 'info',
          silent: (configService.isProduction) ? true : false,
          maxSize: '20m',
          maxFiles: '2d'
        })
       
      ],
      
      // other options
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccounttypeModule,
    UserModule,
    AuthModule,
    WalletModule,
    CommissionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
