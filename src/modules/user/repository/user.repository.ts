import { User } from './../entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './../dto/user.dto';
import { UserRO } from '../ro/users.ro';
import { HttpStatus } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    createUser = async (createUserDto): Promise <any> => {
        const user = await this.create(createUserDto);
        return await this.save(user);
    };
    
    findAllUsers = async (query): Promise <UserRO[]> => {
        //console.log(query);
        const qr = (query) ?
        {
            where: query,  
            relations : ['accountType', 'address']
        }
        :
        { 
            relations : ['accountType', 'address']
        }
        return await this.find(qr);
    };

    findOneUser = async (id: string): Promise <UserRO> => {
        return await this.findOneOrFail(id,{relations : ['accountType', 'address']});
    };

    findOneByEmail = async (username): Promise <any> => {
        return await this.findOne({email : username});
    };


    updateUser = async (id: string, createUserDto: CreateUserDto): Promise <any> => {
        //return await this.save({ ...createUserDto, id: id });
        return await this.update({id}, createUserDto );
    };

    removeUser = async (id: string): Promise <any> => {
        const user = await this.findOneOrFail(id,{relations : ['accountType', 'address']});
        //Admin user cant be deleted
        if(user.accountType.accountType == 'admin'){
            return { status: HttpStatus.UNAUTHORIZED, error: 'Admin User cant be deleted'};
        }
        return await this.delete(id);
    };
}