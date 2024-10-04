import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, DeleteResult } from 'typeorm';
import { KPIAdmin } from '@entities/admin/kpi.admin.entity';
import { KPIHistoryAdmin } from '@entities/admin/kpi-history.admin.entity';

@Injectable()
export class KPIService {
  constructor(
    @InjectRepository(KPIAdmin)
    private kpiRepository: Repository<KPIAdmin>,
    @InjectRepository(KPIHistoryAdmin)
    private kpiHistoryRepository: Repository<KPIHistoryAdmin>,
  ) {}

  async findAll(): Promise<KPIAdmin[]> {
    return this.kpiRepository.find();
  }

  async findOne(id: string): Promise<KPIAdmin> {
    const kpi: KPIAdmin = await this.kpiRepository.findOne({ where: { id } });
    if (!kpi) {
      throw new NotFoundException(`KPI with ID "${id}" not found`);
    }
    return kpi;
  }

  async create(kpiData: Partial<KPIAdmin>): Promise<KPIAdmin> {
    const kpi: KPIAdmin = this.kpiRepository.create(kpiData);
    return this.kpiRepository.save(kpi);
  }

  async update(id: string, kpiData: Partial<KPIAdmin>): Promise<KPIAdmin> {
    await this.findOne(id);
    await this.kpiRepository.update(id, kpiData);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result: DeleteResult = await this.kpiRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`KPI with ID "${id}" not found`);
    }
  }

  async updateLimit(id: string, limit: number): Promise<KPIAdmin> {
    const kpi: KPIAdmin = await this.findOne(id);
    kpi.limit = limit;
    return this.kpiRepository.save(kpi);
  }

  async getTrends(startDate: Date, endDate: Date) {
    const kpis: KPIAdmin[] = await this.kpiRepository.find({ relations: ['history'] });
    const trends = {};

    for (const kpi of kpis) {
      const history: KPIHistoryAdmin[] = await this.kpiHistoryRepository.find({
        where: {
          kpi: { id: kpi.id },
          date: Between(startDate, endDate)
        },
        order: { date: 'ASC' }
      });

      trends[kpi.name] = history.map(entry => ({
        date: entry.date,
        value: entry.value
      }));
    }

    return trends;
  }

  async addHistoryEntry(id: string, value: number): Promise<void> {
    const kpi: KPIAdmin = await this.findOne(id);
    const historyEntry: KPIHistoryAdmin = this.kpiHistoryRepository.create({
      kpi,
      value,
      date: new Date()
    });
    await this.kpiHistoryRepository.save(historyEntry);

    const previousEntries: KPIHistoryAdmin[] = await this.kpiHistoryRepository.find({
      where: { kpi: { id } },
      order: { date: 'DESC' },
      take: 2
    });

    kpi.value = value;
    if (previousEntries.length > 1) {
      const previousEntry: KPIHistoryAdmin = previousEntries[1];
      kpi.trend = ((value - previousEntry.value) / previousEntry.value) * 100;
    }
    await this.kpiRepository.save(kpi);
  }
}