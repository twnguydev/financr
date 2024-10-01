import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsService } from '@modules/tenants/tenants.service';
import { TenantsController } from '@modules/tenants/tenants.controller';
import { Tenant } from '@entities/tenant.entity';
import { TenantRole } from '@entities/tenant.role.entity';
import { BillingModule } from '@modules/billing/billing.module';
import { User } from '@entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, TenantRole, User]),
    BillingModule,
  ],
  controllers: [TenantsController],
  providers: [TenantsService],
  exports: [TenantsService],
})
export class TenantsModule { }
