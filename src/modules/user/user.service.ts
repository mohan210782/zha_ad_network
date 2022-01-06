

import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserRepository } from './repository/user.repository';
import { UserRO } from './ro/users.ro';
import { UserWalletRepository } from '../wallet/repository/userWallet.repository';
import { WalletService } from '../wallet/wallet.service';
import { AccounttypeService } from '../accounttype/accounttype.service';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        @Inject(WalletService) private readonly userWalletService: WalletService,
        @Inject(AccounttypeService) private readonly accountTypeService: AccounttypeService,
      ) {}
      
      create = async (accountTypeId, createUserDto: CreateUserDto, user): Promise <any> => {
        //console.log(user);
        const loggedinUserType = user.accountType.accountType;
        const creatingUserType = await this.accountTypeService.find(accountTypeId);
        //console.log(loggedinUserType, creatingUserType.accountType)
        let createStatus = false;
        switch(loggedinUserType){
          case 'admin':
            if(creatingUserType.accountType == 'developer' || creatingUserType.accountType == 'customer' || creatingUserType.accountType == 'client'){
              createStatus = true;
            }
            break;
          case 'developer':
            if(creatingUserType.accountType == 'admin' || creatingUserType.accountType == 'customer' || creatingUserType.accountType == 'client'){
              createStatus = true;
            }
            break;
          case 'client':
            createStatus = false;
            break;
          case 'customer':
            //console.log('casecust',loggedinUserType);
            createStatus = false;
            break;
        }

        if(createStatus){
          const userCreated = await this.userRepository.createUser({...createUserDto, accountType: accountTypeId, createdBy : user.id});
          //console.log(userCreated);
          let userWallet = {
            'walletUpperLimit' : createUserDto.userWallet.walletUpperLimit,
            'walletLowerLimit' : createUserDto.userWallet.walletLowerLimit,
            'walletCurrentAmount' : createUserDto.userWallet.walletCurrentAmount,
          }
          const userWalletCreated = await this.userWalletService.create(userCreated.id, userWallet, user);
          return userCreated; 
        }else{
          return { status: HttpStatus.SERVICE_UNAVAILABLE, error: 'You are not permitted to create "'+creatingUserType.accountType+'"'};
        }
        
      };
    
      update = async (id: string, createUserDto: CreateUserDto, user): Promise <UserRO> => {
        return await this.userRepository.updateUser(id,createUserDto);
      };

      findOneByEmail = async (username): Promise <any> => {
         return await this.userRepository.findOne({email : username});
      };

      findOneById = async (id): Promise <any> => {
        return await this.userRepository.findOneUser(id);
      };

      saveOrUpdateRereshToken = async (id: string, token): Promise <any> =>{
        return await this.userRepository.update(id,token);
      };

    

       
}

