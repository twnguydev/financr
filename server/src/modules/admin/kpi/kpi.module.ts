import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KPIController } from '@modules/admin/kpi/kpi.controller';
import { KPIService } from '@modules/admin/kpi/kpi.service';
import { KPIAdmin } from '@entities/admin/kpi.admin.entity';
import { KPIHistoryAdmin } from '@entities/admin/kpi-history.admin.entity';
import { AdminGuard } from '@/guards/admin.guard';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([KPIAdmin, KPIHistoryAdmin]), UsersModule],
  controllers: [KPIController],
  providers: [KPIService, AdminGuard],
  exports: [KPIService],
})
export class KPIModule {}