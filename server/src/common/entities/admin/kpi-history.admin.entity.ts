import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { KPIAdmin } from './kpi.admin.entity';

@Entity('admin_kpi_history')
export class KPIHistoryAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => KPIAdmin, kpi => kpi.history)
  kpi: KPIAdmin;

  @Column('float')
  value: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', readonly: true })
  createdAt: Date;
}