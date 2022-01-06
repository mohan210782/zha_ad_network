import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWallet } from './entities/userWallet.entity'
import { Repository } from 'typeorm';
import { CreateUserWalletDto, UpdateCurrentAmtDto } from './dto/userWallet.dto';
import { UserWalletRepository } from './repository/userWallet.repository';
import { UserWalletRO } from './ro/userWallet.ro';


@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(UserWalletRepository) private readonly userWalletRepository: UserWalletRepository,
      ) {}
      
      create = async (userId, createUserWalletDto: CreateUserWalletDto, user): Promise <UserWalletRO> => {
        return await this.userWalletRepository.createUserWallet({...createUserWalletDto, createdBy : user.id, user: userId});
      };

      findOneUserWallet = async (Id): Promise <UserWalletRO> => {
        return await this.userWalletRepository.findOneUserWallet(Id);
      };
    
      update = async (id: string, createUserWalletDto: CreateUserWalletDto, user): Promise <UserWalletRO> => {
        return await this.userWalletRepository.updateUserWallet(id,createUserWalletDto);
      };

      updateAmtBuy = async (updateCurrentAmtDto: UpdateCurrentAmtDto): Promise <any> => {
        const wallet = await this.userWalletRepository.findOneUserWallet(updateCurrentAmtDto.id);
        const walletCurrentAmountAccessable = wallet.walletCurrentAmount - wallet.walletLowerLimit;
        if(walletCurrentAmountAccessable >= updateCurrentAmtDto.walletCurrentAmount){
          wallet.walletCurrentAmount = wallet.walletCurrentAmount - updateCurrentAmtDto.walletCurrentAmount;
          let currentserWalletObj = {
            id: updateCurrentAmtDto.id,
            walletCurrentAmount : wallet.walletCurrentAmount,
          }
          try{
            let result = await this.userWalletRepository.updateUserWalletAmount(updateCurrentAmtDto.id,currentserWalletObj);
            if(result) {
              return {status : true, message : result}
            }else{
              return { status: false, message: 'You are not permitted - Check your Wallet Balance/Lower limit '};
            }
          }catch(e){
            console.log(e);
          }
         
        }else{
          return { status: false, message: 'You are not permitted - Check your Wallet Balance/Lower limit '};
        }
        
      };
      updateAmtSell = async (updateCurrentAmtDto: UpdateCurrentAmtDto): Promise <any> => {
        const wallet = await this.userWalletRepository.findOneUserWallet(updateCurrentAmtDto.id);
       
       
          wallet.walletCurrentAmount = wallet.walletCurrentAmount + updateCurrentAmtDto.walletCurrentAmount;
          let currentserWalletObj = {
            id: updateCurrentAmtDto.id,
            walletCurrentAmount : wallet.walletCurrentAmount,
          }
          try{
            let result = await this.userWalletRepository.updateUserWalletAmount(updateCurrentAmtDto.id,currentserWalletObj);
            return {status : true, message : result}
          }catch(e){
            return { status: false, message: e};
          }
        
        
      };

      
}
