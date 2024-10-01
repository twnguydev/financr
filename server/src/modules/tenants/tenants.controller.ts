import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TenantsService } from '@modules/tenants/tenants.service';
import { Tenant } from '@entities/tenant.entity';
import { User } from '@entities/user.entity';
import { SubscriptionType } from '@enums/subscription-type.enum';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async createTenant(
    @Body('name') name: string,
    @Body('subscriptionType') subscriptionType: SubscriptionType,
    @Body('userLimit') userLimit: number,
  ): Promise<Tenant> {
    if (!(subscriptionType in SubscriptionType)) {
      throw new Error('Invalid subscription type');
    }
    return this.tenantsService.createTenant(name, subscriptionType, userLimit);
  }

  @Get()
  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantsService.getAllTenants();
  }

  @Get(':id')
  async getTenantById(@Param('id') id: string): Promise<Tenant> {
    return this.tenantsService.getTenantById(id);
  }

  @Get(':id/users')
  async getTenantUsers(@Param('id') id: string): Promise<User[]> {
    return this.tenantsService.getTenantUsers(id);
  }

  @Get('/user/:userId')
  async getUserTenants(@Param('userId') userId: string): Promise<Tenant[]> {
    return this.tenantsService.getUserTenants(userId);
  }

  @Patch(':id')
  async updateTenant(
    @Param('id') id: string,
    @Body() updateData: Partial<Tenant>,
  ): Promise<Tenant> {
    return this.tenantsService.updateTenant(id, updateData);
  }

  @Delete(':id')
  async deleteTenant(@Param('id') id: string): Promise<void> {
    return this.tenantsService.deleteTenant(id);
  }
}
