import { Entity, Column, Unique, BeforeInsert, BeforeUpdate, ManyToOne, OneToOne, JoinColumn, Index, Check, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from "class-validator";

import * as bcrypt from 'bcrypt';

import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountType} from '../../accounttype/entities/accounttype.entity';
import { Address} from '../entities/address.entity'

import { genderEnum } from '../enums/user.enum'

import { UserRO} from '../ro/users.ro';
import { UserWallet } from '../../wallet/entities/userWallet.entity';

@Entity({name: "users"})

@Index(["email"], { unique: true })
@Check(`"age" > 18`)
export class User extends BaseEntity {
    
    @Column({ type: 'varchar', length: 20 })
    @IsNotEmpty({ message: 'The first name is required' })
    firstName: string;
  
    @Column({ type: 'varchar', length: 20, })
    @IsNotEmpty({ message: 'The last name is required' })
    lastName: string;

    @Column({  
        type: "enum",
        enum: genderEnum,
    })
    @IsNotEmpty({ message: 'The gender is required' })
    gender: genderEnum;
  
    @Column({type: 'varchar', length: 30, unique: true,})
    @IsNotEmpty({ message: 'The email is required' })
    @IsEmail()
    email: string;
  
    @Column({ type: 'varchar',})
    @IsNotEmpty({ message: 'The phone number is required' })
    phone: string;
  
    @Column()
    @IsNotEmpty({ message: 'The password is required' })
    password: string;

    @Column({type : 'int' })
    @IsNotEmpty({ message: 'The age is required' })
    age: number;
  
    @Column({type : 'int', nullable: true })
    pin: number;

    @Column({type : 'text', nullable: true })
    refreshtoken

    @Column({ type: 'timestamptz', nullable: true})
    refreshtokenexpires: Date;
    
    @Column({ type: 'float', nullable: true})
    commission: number;

    // @OneToOne(type => Address) @JoinColumn( ) 
    // address: Address;

    @OneToOne(() => Address, (address: Address) => address.user, {
        cascade: true,
        eager: true,
      })
      @JoinColumn()
      public address: Address;

    @ManyToOne(() => AccountType, (accountType: AccountType) => accountType.users)
    @JoinColumn()
    public accountType: AccountType;

    @OneToOne(() => UserWallet, (userWallet: UserWallet) => userWallet.user, {
        cascade: true,
        eager: true,
      })
      @JoinColumn()
      public userWallet: UserWallet;



    
    @BeforeUpdate()
    @BeforeInsert()
    async hashPassword() {
        console.log("passwordhash");
        this.password = await bcrypt.hash(this.password, 10);
    }


    async comparePassword(attempt: string): Promise<any> {
        return await bcrypt.compare(attempt, this.password);
    }

    toResponseObject(showToken: boolean = true): UserRO {
        const { id, firstName, lastName, gender, email, phone, isActive } = this;
        const responseObject: UserRO = {
        id,
        firstName,
        lastName,
        gender,
        email,
        phone,
        isActive
        };

        return responseObject;
    }
}