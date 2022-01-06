import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserRepository } from './repository/user.repository';
import { UserWallet } from '../wallet/entities/userWallet.entity';
import { UserWalletRepository } from '../wallet/repository/userWallet.repository';
import { WalletModule } from '../wallet/wallet.module';
import { WalletService } from '../wallet/wallet.service';
import { AccounttypeModule } from '../accounttype/accounttype.module';

@Module({

  imports: [TypeOrmModule.forFeature([User, UserRepository]), WalletModule, AccounttypeModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
