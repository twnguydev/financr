import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomeController {
  constructor() {}

  @Get()
  async getApp(): Promise<{ message: string }> {
    return { message: 'Welcome to Financr API' };
  }
}