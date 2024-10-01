import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing.service';
import { Billing } from '@entities/billing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Billing])],
  providers: [BillingService],
  exports: [BillingService],
})
export class BillingModule {}
