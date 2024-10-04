import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('financr_settings')
export class SettingsAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  key: string;

  @Column('text')
  value: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', readonly: true })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}