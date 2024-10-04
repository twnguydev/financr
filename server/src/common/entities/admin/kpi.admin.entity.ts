import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { KPIHistoryAdmin } from './kpi-history.admin.entity';

@Entity('admin_kpi')
export class KPIAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description_fr: string;

  @Column('text')
  description_en: string;

  @Column('float')
  value: number;

  @Column('float')
  trend: number;

  @Column('float')
  limit: number;

  @Column()
  color: string;

  @OneToMany(() => KPIHistoryAdmin, history => history.kpi)
  history: KPIHistoryAdmin[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', readonly: true })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}