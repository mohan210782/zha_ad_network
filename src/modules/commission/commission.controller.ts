import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/role.decorator';
import { JwtAuthGuard } from '../auth/interface/jwt-auth.guard';
import { RolesGuard } from '../auth/interface/role.guard';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { UpdateCommissionDto } from './dto/update-commission.dto';

@ApiBearerAuth()
@ApiTags('Commission')
@Controller('commission')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  /*@Post()
  create(@Body() createCommissionDto: CreateCommissionDto) {
    return this.commissionService.create(createCommissionDto);
  }

  @Get()
  findAll() {
    return this.commissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commissionService.findOne(+id);
  }*/

  @ApiOperation({ summary: 'Update User Commission.' })
  @Patch(':userid/:commission')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'developer')
  update(@Param('userid') userId: string, @Param('commission') userCommission: number) {
    return this.commissionService.updateCommission(userId, userCommission);
  }

  /*@Delete(':id')
  remove(@Param('id') id: string) {
    return this.commissionService.remove(+id);
  }*/
}
