import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';
import * as moment from 'moment-timezone';

import { AppModule } from './app/app.module';

async function bootstrap() {
  moment.tz.setDefault('Asia/Bangkok');
  const app = await NestFactory.create(
    AppModule,
    { logger: ['log', 'error', 'warn'] },
  );

  const configService = app.get(ConfigService);

  app.use(helmet());
  app.use(cors({
    origin: [
      /localhost(:\d+)?$/,
    ],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
  }));
  app.use(
    rateLimit({
      windowMs: configService.get<number>('rateLimit.windowTimeMs'),
      max: configService.get<number>('rateLimit.maxRequest'),
    }),
  );

  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
  await app.listen(
    configService.get<number>('port'),
    configService.get<string>('hostname'),
  );
}
bootstrap();
