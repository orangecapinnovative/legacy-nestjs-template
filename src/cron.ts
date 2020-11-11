import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment-timezone';

import { CronModule } from './cron/cron.module';

async function bootstrap() {
  moment.tz.setDefault('Asia/Bangkok');
  const app = await NestFactory.create(
    CronModule,
    { logger: ['log', 'error', 'warn'] },
  );

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('cronPort'), configService.get<string>('hostname'));
}
bootstrap();
