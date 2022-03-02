import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

import { ErrorResponseMessage } from '../constants/api';

@Controller({
  path: '',
  version: '1',
})
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) { }

  @Get('/')
  getMain() {
    return { ping: 'pong' };
  }

  @Get('/healthz')
  healthcheck() {
    if (this.connection.readyState === 1) {
      return { success: true };
    }
    throw new HttpException({
      message: ErrorResponseMessage.MONGODB_CONNECTION_NOT_READY,
    }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
