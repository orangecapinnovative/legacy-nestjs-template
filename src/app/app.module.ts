import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import appConfig from '../config/app.config';
import { AppController } from './app.controller';

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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
