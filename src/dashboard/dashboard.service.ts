import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {

  constructor(private readonly dashboardRepository: DashboardRepository) { }

  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  async getDashboardStatistics(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    const res = await this.dashboardRepository.getDashboardStatistics(userId);
    return {
      data: res
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
}
