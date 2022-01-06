import { Entity, Column, Unique, BeforeInsert, BeforeUpdate, ManyToOne, OneToOne } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from "class-validator";


import { addressRO} from '../ro/address.ro';
import { User } from './user.entity';
import { CommonEntity } from './../../../common/entities/common.entiy';

@Entity({name: "address"})
export class Address extends CommonEntity {
    
    @Column({ type: 'varchar', length: 100 })
    street: string;
  
    @Column({ type: 'varchar', length: 100 })
    addressline1: string;

    @Column({ type: 'varchar', length: 20 })
    @IsNotEmpty({ message: 'The city  is required' })
    city: string;

    @Column({ type: 'varchar', length: 20 })
    @IsNotEmpty({ message: 'The state is required' })
    state: string;
  
    @Column({ type: 'varchar', length: 20 })
    @IsNotEmpty({ message: 'The country is required' })
    country: string;
    
    @Column({ type: 'varchar', length: 20 })
    @IsNotEmpty({ message: 'The zip is required' })
    zip: string;

    @OneToOne(() => User, (user: User) => user.address)
    public user: User;


    @BeforeInsert()
    @BeforeUpdate()
   

    toResponseObject(showToken: boolean = true): addressRO {
        const { id, street, addressline1, city, state, country, zip, isActive } = this;
        const responseObject: addressRO = {
        id,
        street,
        addressline1,
        city,
        state,
        country,
        zip,
        isActive
        };

        return responseObject;
    }
}
export default Address;