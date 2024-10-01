import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Billing } from '@entities/billing.entity';
import { PaymentMethod } from '@enums/payment-method.enum';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private billingRepository: Repository<Billing>,
  ) {}

  async createBilling(tenantId: string, amount: number, paymentMethod: PaymentMethod): Promise<Billing> {
    if (!(paymentMethod in PaymentMethod)) {
      throw new Error('Invalid payment method');
    }

    const newBilling: Billing = this.billingRepository.create({
      tenant: { id: tenantId },
      amount,
      paymentMethod,
      paymentDate: new Date(),
    });

    return this.billingRepository.save(newBilling);
  }

  async findBillingByTenant(tenantId: string): Promise<Billing[]> {
    return this.billingRepository.find({ where: { tenant: { id: tenantId } } });
  }
}
