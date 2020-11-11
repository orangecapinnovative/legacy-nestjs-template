import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get('/')
  getMain() {
    return { ping: 'pong' };
  }
}
