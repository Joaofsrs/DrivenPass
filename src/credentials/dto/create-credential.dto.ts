import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

export class CreateCredentialDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Titulo teste',
        description: 'Titulo da crednecial'
    })
    titulo: string

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({
        example: 'https://github.com',
        description: 'Url do site'
    })
    url: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Usuarioteste',
        description: 'Usuario da conta'
    })
    user: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Senha',
        description: 'Senha da conta'
    })
    senha: string
}
