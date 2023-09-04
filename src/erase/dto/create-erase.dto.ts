import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEraseDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Senha@teste123',
        description: 'Mesma senha da conta que esta logada'
    })
    senha: string
}
