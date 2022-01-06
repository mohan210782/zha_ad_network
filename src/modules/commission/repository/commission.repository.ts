import { User } from './../../user/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class CommissionRepository extends Repository<User> {
    updateUser = async (id: string, userCommission: number): Promise <any> => {
        //return await this.save({ ...createUserDto, id: id });
        return await this.update({id}, {commission: userCommission} );
    };
}