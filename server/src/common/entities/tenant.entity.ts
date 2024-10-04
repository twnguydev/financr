import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TenantRole } from '@entities/tenant.role.entity';
import { SubscriptionType } from '@enums/subscription-type.enum';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => TenantRole, tenantRole => tenantRole.tenant)
  roles: TenantRole[]; // accounters, managers, etc.

  @Column({ default: 10 }) // User limit for "Entreprise" subscription
  userLimit: number;

  @Column({ type: 'enum', enum: SubscriptionType })
  subscriptionType: SubscriptionType; // For example: 'Entreprise', 'Pro', etc.

  @Column({ type: 'json', nullable: true })
  billingInformations: { address: string, city: string, zipcode: string, country: string, cardDetails: string };

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', readonly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
