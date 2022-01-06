import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty()
    readonly email: string;	//defines email as a string

    @ApiProperty()
    readonly password: string;	//defines password as a string
}