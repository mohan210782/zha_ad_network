import { Entity, Column, Unique, OneToMany } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from "class-validator";

import { CommonEntity } from '../../../common/entities/common.entiy';
import { accountTypeEnum} from '../enums/accounttype.enum'
import { User} from '../../user/entities/user.entity';
@Entity({ name: 'accounttype' })
@Unique(['accountType'])
export class AccountType extends CommonEntity {

  @Column({  
    type: "enum",
    enum: accountTypeEnum,
    default: accountTypeEnum.customer,
  })
  @IsNotEmpty({ message: 'The account type is required' })
  accountType: accountTypeEnum;

  @Column({ type: 'varchar', length: 300, })
  description: string;

  @OneToMany(() => User, (user: User) => user.id)
  users: User[]
 
}