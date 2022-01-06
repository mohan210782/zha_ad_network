import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AccountType } from './entities/accounttype.entity'

import { Repository } from 'typeorm';
import { AccountTypeRepository } from './repository/accountType.repository';

import { CreateAccountTypeDto } from './dto/accountType.dto';

import {AccountTypeRO} from './ro/accountType.ro';

@Injectable()
export class AccounttypeService {
    constructor(
      @InjectRepository(AccountTypeRepository) private readonly accountTypeRepository: AccountTypeRepository,
    //private readonly loggerService: LoggerService
    ) {}
    
    create = async (createAccountTypeDto: CreateAccountTypeDto): Promise <AccountTypeRO> => {
      return await this.accountTypeRepository.createAccountType(createAccountTypeDto);
    };
  
    update = async (id: string, createAccountTypeDto: CreateAccountTypeDto): Promise <AccountTypeRO> => {
      return this.accountTypeRepository.updateAccountType(id, createAccountTypeDto);
    };

    find = async (id: string): Promise <AccountTypeRO> => {
      return await this.accountTypeRepository.findOneAccountType(id);
    };


  
   
}
