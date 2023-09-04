import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        example: 'teste@gmail.com',
        description: 'Email do usuario'
    })
    email: string

    @IsString()
    @IsStrongPassword()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Senha@123teste',
        description: 'Senha do usuario'
    })
    password: string
}
