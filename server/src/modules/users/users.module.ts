import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '@modules/users/users.service';
import { UsersController } from '@modules/users/users.controller';
import { User } from '@entities/user.entity';
import { Tenant } from '@entities/tenant.entity';
import { TenantRole } from '@entities/tenant.role.entity';
import { TenantsModule } from '@modules/tenants/tenants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tenant, TenantRole]),
    TenantsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }