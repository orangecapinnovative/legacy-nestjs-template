import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from 'src/database/database.module';

import appConfig from '../config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        appConfig,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: `${configService.get<string>('mongodb.host')}${configService.get<string>('mongodb.databaseName')}`,
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
  ],
  providers: [

  ],
})
export class CronModule {}
