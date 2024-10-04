import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KPIController } from '@modules/admin/kpi/kpi.controller';
import { KPIService } from '@modules/admin/kpi/kpi.service';
import { KPIAdmin } from '@entities/admin/kpi.admin.entity';
import { KPIHistoryAdmin } from '@entities/admin/kpi-history.admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([KPIAdmin, KPIHistoryAdmin])],
  controllers: [KPIController],
  providers: [KPIService],
  exports: [KPIService],
})
export class KPIModule {}