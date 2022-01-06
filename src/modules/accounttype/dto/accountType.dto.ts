import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';
import { accountTypeEnum} from '../enums/accounttype.enum';

export class CreateAccountTypeDto {
    //@ApiProperty()
    //readonly id: number;

    @Column({  
        type: "enum",
        enum: accountTypeEnum,
     })
    @ApiProperty({
        description: "Name of the attount type",
        enum: accountTypeEnum,
        example: accountTypeEnum.customer
    })
    accountType: accountTypeEnum;

    @ApiProperty({
        description: "Description of the attount type",
        example: 'End user of the application'
    })
    description: string;


   
}
