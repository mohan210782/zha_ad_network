import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { CommonEntity} from './common.entiy';
export abstract class BaseEntity extends CommonEntity {
   
    @Column({ type: 'varchar', length: 300 })
    createdBy: string;

}