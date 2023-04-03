import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  Hello() {
    return 'App listened at port 8080';
  }
}
