import { Entity, Column, Unique, BeforeInsert, BeforeUpdate, ManyToOne, OneToOne, JoinColumn, Index, Check } from 'typeorm';
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { UserWalletRO } from '../ro/userWallet.ro';
import { CommonEntity } from '../../../common/entities/common.entiy';

@Entity({name: "userwallet"})

//@Index(["user"], { unique: true })
export class UserWallet extends CommonEntity {
    @Column({ type: 'float', nullable: true })
    @IsNotEmpty({ message: "Wallet's Upper Limit is required" })
    walletUpperLimit: number;

    @Column({ type: 'float', nullable: true })
    @IsNotEmpty({ message: "Wallet's Lower Limit is required" })
    walletLowerLimit: number;

    @Column({ type: 'float', nullable: true })
    walletCurrentAmount: number;

    // @OneToOne(() => User, (user: User) => user.id, {
    //     cascade: true,
    //     eager: true,
    //   })
    //   @JoinColumn()
    //   public user: User;

    @OneToOne(() => User, (user: User) => user.userWallet)
    public user: User;

      @BeforeUpdate()
      @BeforeInsert()

    toResponseObject(showToken: boolean = true): UserWalletRO {
        const { id, user, walletUpperLimit, walletLowerLimit, walletCurrentAmount } = this;
        const responseObject: UserWalletRO = {
        id,
        user,
        walletUpperLimit,
        walletLowerLimit,
        walletCurrentAmount
        };

        return responseObject;
    }
}