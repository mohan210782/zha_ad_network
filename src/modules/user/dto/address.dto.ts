import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, MongoEntityManager, BeforeInsert,ManyToOne, JoinColumn } from 'typeorm';

export class CreateAddressDto {
    //@ApiProperty()
    //readonly id: number;

    

    @ApiProperty({
        description: "1'st line of address ",
        example: "No 111"
    })
    addressline1: string;

    @ApiProperty({
        description: "Street Name of the address",
        example: "street no 1"
    })
    street: string;

    @ApiProperty({
        description: "City of the address",
        example: "city"
    })
    city: string;

    @ApiProperty({
        description: "state of the address",
        example: "state"
    })
    state: string;

    @ApiProperty({
        description: "country of the address",
        example: "lami"
    })
    country: string;

    @ApiProperty({
        description: "Zip code or postal code of the address",
        example: "country"
    })
    zip: string;

   
}

