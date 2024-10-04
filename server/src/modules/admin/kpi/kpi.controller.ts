import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Query } from '@nestjs/common';
import { KPIService } from '@modules/admin/kpi/kpi.service';
import { KPIAdmin } from '@entities/admin/kpi.admin.entity';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { AdminGuard } from '@guards/admin.guard';

@Controller('admin/kpi')
@UseGuards(JwtAuthGuard, AdminGuard)
export class KPIController {
  constructor(private readonly kpiService: KPIService) {}

  @Get()
  async findAll(): Promise<KPIAdmin[]> {
    return this.kpiService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<KPIAdmin> {
    return this.kpiService.findOne(id);
  }

  @Post()
  async create(@Body() kpiData: Partial<KPIAdmin>): Promise<KPIAdmin> {
    return this.kpiService.create(kpiData);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() kpiData: Partial<KPIAdmin>): Promise<KPIAdmin> {
    return this.kpiService.update(id, kpiData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.kpiService.remove(id);
  }

  @Put(':id/limit')
  async updateLimit(@Param('id') id: string, @Body('limit') limit: number): Promise<KPIAdmin> {
    return this.kpiService.updateLimit(id, limit);
  }

  @Get('trends')
  async getTrends(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.kpiService.getTrends(new Date(startDate), new Date(endDate));
  }

  @Post(':id/history')
  async addHistoryEntry(@Param('id') id: string, @Body('value') value: number): Promise<void> {
    return this.kpiService.addHistoryEntry(id, value);
  }
}