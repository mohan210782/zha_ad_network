import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';
import { genderEnum  } from '../enums/user.enum';

import { CreateAddressDto } from './address.dto';
import { BaseDto } from './../../../common/dto/base.dto';

import {AccountType} from './../../accounttype/entities/accounttype.entity';
import { from } from 'rxjs';
import { CreateUserWalletDto } from '../../wallet/dto/userWallet.dto';
  
export class CreateUserDto {
    //@ApiProperty()
    //readonly id: number;

    @ApiProperty({
        description: "First Name of the user",
        example: "lami"
    })
    firstName: string;

    @ApiProperty({
        description: "Last Name of the user",
        example: "pra"
    })
    lastName: string;

    @Column({  
        type: "enum",
        enum: genderEnum,
     })
    @ApiProperty({
        description: "Gender of the user",
        enum: genderEnum,
        example: genderEnum.male
    })
    gender: genderEnum;

    @ApiProperty({
        description: "Email of the user",
        example: "lami@email.com"
    })
    email: string;

    @ApiProperty({
        description: "Phone Number of the user",
        example: "111-111-1111"
    })
    phone: string;

    @ApiProperty({
        description: "password of the user",
        example: "password"
    })
    password: string;

    @ApiProperty({
        description: "Age of the user, should be more that 18",
        example: 22
    })
    age: number;

    @ApiProperty({
        description: "Commission percentage for this user from his subordinate users Commission/Profit, which they got from their subordinate users Commission/Profit",
        example: 5
    })
    commission: number;
    // @ApiProperty()
    // accountType: AccountType;

    @ApiProperty()
    address : CreateAddressDto;
    
    @ApiProperty()
    userWallet : CreateUserWalletDto;
    //refreshtoken : string
    //refreshtokenexpires : Date


    
}

