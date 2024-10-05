import { Tenant } from '@/types/tenant';

export interface Billing {
  id: string;
  tenant: Tenant;
  paymentMethod: PaymentMethodEnum;
  amount: number;
  paymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export enum SubscriptionEnum {
  STARTER = 'starter',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
}

export enum PaymentMethodEnum {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  APPLE_PAY = 'apple_pay',
  GOOGLE_PAY = 'google_pay',
  STRIPE = 'stripe',
  ALIPAY = 'alipay'
}