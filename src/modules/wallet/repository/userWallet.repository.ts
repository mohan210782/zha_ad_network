import { UserWallet } from './../entities/userWallet.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserWalletDto, UpdateCurrentAmtDto } from './../dto/userWallet.dto';
import { UserWalletRO } from './../ro/userWallet.ro';

@EntityRepository(UserWallet)
export class UserWalletRepository extends Repository<UserWallet> {
    createUserWallet = async (createUserWalletDto): Promise <any> => {
        const userWallet = await this.create(createUserWalletDto);
        return await this.save(userWallet);
    };
    
    findAllUserWallets = async (query): Promise <UserWalletRO[]> => {
        return await this.find({
            where: query,  
            relations : ['user']
        });
    };

    findOneUserWallet = async (id: string): Promise <UserWalletRO> => {
        return await this.findOneOrFail(id);
    };

    findOneByUser = async (user: any): Promise <any> => {
        return await this.findOne({user : user});
    };

    updateUserWallet = async (id: string, createUserWalletDto: CreateUserWalletDto): Promise <any> => {
        return await this.update({id}, createUserWalletDto );
    };

    updateUserWalletAmount = async (id: string, updateCurrentAmtDto: UpdateCurrentAmtDto): Promise <any> => {
        return await this.update({id}, updateCurrentAmtDto );
    };


    removeUserWallet = async (id: string): Promise <any> => {
        await this.findOneOrFail(id);
        return await this.delete(id);
    };

    removeUserWalletByUser = async (id: string): Promise <any> => {
        const wallet = await this.findOneOrFail({where: {user: id}});
        return await this.delete(wallet.id);
    };

    
}