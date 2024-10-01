import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '@entities/user.entity';
import { Tenant } from '@entities/tenant.entity';

@Entity()
export class TenantRole {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.tenantRoles, { eager: true })
  user: User;

  @ManyToOne(() => Tenant, tenant => tenant.roles, { eager: true })
  tenant: Tenant;

  @Column()
  role: string;
}