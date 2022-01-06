import { Module } from '@nestjs/common';
import { AccounttypeController } from './accounttype.controller';
import { AccounttypeService } from './accounttype.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountType} from './entities/accounttype.entity';
import { AccountTypeRepository } from './repository/accountType.repository';
@Module({
  imports: [TypeOrmModule.forFeature([AccountType, AccountTypeRepository])],
  controllers: [AccounttypeController],
  providers: [AccounttypeService],
  exports: [AccounttypeService]
})
export class AccounttypeModule {}
