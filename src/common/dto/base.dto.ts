import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';


export class BaseDto {
    //@ApiProperty()
    //readonly id: number;


    @ApiProperty()
    @Column({ type: 'varchar', length: 300 })
    createdBy: string;


   
}
