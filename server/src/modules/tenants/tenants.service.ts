import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tenant } from '@entities/tenant.entity';
import { TenantRole } from '@entities/tenant.role.entity';
import { User } from '@entities/user.entity';
import { SubscriptionType } from '@enums/subscription-type.enum';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(TenantRole)
    private tenantRolesRepository: Repository<TenantRole>,
    @InjectRepository(Tenant)
    private tenantsRepository: Repository<Tenant>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createTenant(name: string, subscriptionType: SubscriptionType, userLimit: number): Promise<Tenant> {
    const newTenant = this.tenantsRepository.create({
      name,
      subscriptionType,
      userLimit,
    });
    return this.tenantsRepository.save(newTenant);
  }

  async createFreeTenant(email: string): Promise<Tenant> {
    const tenant = this.tenantsRepository.create({
      name: `${email}'s Tenant`,
      userLimit: 1,
      subscriptionType: SubscriptionType.STARTER
    });
    return this.tenantsRepository.save(tenant);
  }

  async findById(id: string): Promise<Tenant> {
    const tenant = await this.tenantsRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException('Tenant not found');
    }
    return tenant;
  }

  async getAllTenants(): Promise<Tenant[]> {
    return this.tenantsRepository.find();
  }

  async getTenantById(id: string): Promise<Tenant> {
    return this.tenantsRepository.findOne({ where: { id } });
  }

  async updateTenant(id: string, updateData: Partial<Tenant>): Promise<Tenant> {
    await this.tenantsRepository.update(id, updateData);
    return this.getTenantById(id);
  }

  async deleteTenant(id: string): Promise<void> {
    await this.tenantsRepository.delete(id);
  }

  async assignRoleToUser(userId: string, tenantId: string, role: string): Promise<TenantRole> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const tenant = await this.tenantsRepository.findOne({ where: { id: tenantId } });

    if (!user || !tenant) {
      throw new Error('User or Tenant not found');
    }

    if (tenant.userLimit && tenant.userLimit <= tenant.roles.length) {
      throw new Error('User limit reached for this tenant');
    }

    const newRole: TenantRole = this.tenantRolesRepository.create({ user, tenant, role });
    return this.tenantRolesRepository.save(newRole);
  }

  async getRolesForTenant(tenantId: string): Promise<TenantRole[]> {
    return this.tenantRolesRepository.find({ where: { id: tenantId } });
  }

  async getTenantUsers(tenantId: string): Promise<User[]> {
    const tenantRoles: TenantRole[] = await this.tenantRolesRepository.find({ where: { tenant: { id: tenantId } }, relations: ['user'] });
    return tenantRoles.map(role => role.user);
  }

  async getUserTenants(userId: string): Promise<Tenant[]> {
    const tenantRoles: TenantRole[] = await this.tenantRolesRepository.find({ where: { user: { id: userId } }, relations: ['tenant'] });
    return tenantRoles.map(role => role.tenant);
  }
}
