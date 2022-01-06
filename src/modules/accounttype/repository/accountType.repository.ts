import { AccountType } from './../entities/accounttype.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateAccountTypeDto } from './../dto/accountType.dto';
import { AccountTypeRO } from '../ro/accountType.ro';

@EntityRepository(AccountType)
export class AccountTypeRepository extends Repository<AccountType> {
    createAccountType = async (createAccountTypeDto: CreateAccountTypeDto): Promise <AccountTypeRO> => {
        return await this.save(createAccountTypeDto);
    };
    
    findAllAccountType = async (): Promise <AccountTypeRO[]> => {
        console.log("test");
        return await this.find();
    };

    findOneAccountType = async (id: string): Promise <AccountTypeRO> => {
        return await this.findOneOrFail(id);
    };

    updateAccountType = async (id: string, createAccountTypeDto: CreateAccountTypeDto): Promise <any> => {
        //return await this.save({ ...createAccountTypeDto, id: id });
        return await this.update({id}, createAccountTypeDto );
    };

    removeAccountType = async (id: string): Promise <any> => {
        await this.findOneOrFail(id);
        return await this.delete(id);
    };
}