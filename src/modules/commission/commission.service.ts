import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';
import { CommissionRepository } from './repository/commission.repository';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(CommissionRepository) private readonly commissionRepository: CommissionRepository,
  ) {}
  /*create(createCommissionDto: CreateCommissionDto) {
    return 'This action adds a new commission';
  }

  findAll() {
    return `This action returns all commission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} commission`;
  }*/

  updateCommission = async(userId: string, userCommission: number): Promise <any> => {
    return await this.commissionRepository.updateUser(userId,userCommission);
  }

  /*remove(id: number) {
    return `This action removes a #${id} commission`;
  }*/
}
