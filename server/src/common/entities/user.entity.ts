import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { TenantRole } from '@entities/tenant.role.entity';
import { PlatformRole } from '@enums/platform-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password?: string;

  @Column({ type: 'enum', enum: PlatformRole, default: PlatformRole.USER })
  platformRole: PlatformRole;

  @OneToMany(() => TenantRole, tenantRole => tenantRole.user)
  tenantRoles: TenantRole[];

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  zipcode: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  verificationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  verificationTokenExpiry?: Date;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', readonly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
