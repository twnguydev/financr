import { TenantRole } from '@types/tenant';

export interface User {
  id: string;
  email: string;
  password?: string;
  platformRole: PlatformRoleEnum;
  tenantRoles: TenantRole[];
  firstname: string;
  lastname: string;
  birthdate: Date | null;
  address: string | null;
  zipcode: string | null;
  city: string | null;
  country: string | null;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export enum PlatformRoleEnum {
  ADMIN = 'admin',
  USER ='user',
}