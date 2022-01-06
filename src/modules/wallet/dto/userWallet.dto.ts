import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';

export class CreateUserWalletDto {
    
    @ApiProperty({
        description: "User Wallet's maximum limit in dollars which is assigned by his super-user, after which user cant trade above this amount",
        example: "5000"
    })
    walletUpperLimit: number;

    @ApiProperty({
        description: "User Wallet's minimum limit in dollars which is assigned by his super-user, after which user cant trade below this amount",
        example: "10"
    })
    walletLowerLimit: number;

    @ApiProperty({
        description: "User Wallet's current amount in dollars",
        example: "4000"
    })
    walletCurrentAmount: number;
}

export class UpdateCurrentAmtDto {
   
    @ApiProperty({
        description: "Wallet Id",
        example: "b9454312-8368-4882-91c5-5641242eada6"
    })
    id : string;
    @ApiProperty({
        description: "Amount to be update",
        example: 4000
    })
    walletCurrentAmount: number;
}