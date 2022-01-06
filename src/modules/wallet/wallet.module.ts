import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserWallet } from './entities/userWallet.entity';
import { UserWalletRepository } from './repository/userWallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserWallet, UserWalletRepository])],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService]
})
export class WalletModule {}
