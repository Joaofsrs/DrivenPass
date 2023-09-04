import { IsNotEmpty, IsString } from "class-validator";

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    titulo: string

    @IsString()
    @IsNotEmpty()
    note: string
}
