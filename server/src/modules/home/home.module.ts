import { Module } from '@nestjs/common';
import { HomeController } from '@modules/home/home.controller';

@Module({
  imports: [],
  controllers: [HomeController],
  exports: [],
})
export class HomeModule {}
