import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    titulo: string

    @IsNumber()
    @IsNotEmpty()
    number: number

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    csv: number

    @IsString()
    @IsNotEmpty()
    validade: string

    @IsString()
    @IsNotEmpty()
    senha: string

    @IsString()
    @IsNotEmpty()
    tipo: string
}
