import { SubscriptionEnum } from '@types/billing';
import { User } from '@types/user';

export interface Tenant {
  id: string;
  name: string;
  roles: TenantRole[];
  userLimit: number;
  subscriptionType: SubscriptionEnum;
  billingInformations: {
    address: string;
    city: string;
    zipcode: string;
    country: string;
    cardDetails: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
};

export interface TenantRole {
  id: number;
  user: User;
  tenant: Tenant;
  role: string;
};