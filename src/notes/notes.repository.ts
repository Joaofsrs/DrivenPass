import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { Users } from "@prisma/client";

@Injectable()
export class NotesRepository {
    constructor(private readonly prisma: PrismaService,) { }

    async create(notees: CreateNoteDto, userId: number) {
        const { titulo, note } = notees;
        return await this.prisma.notes.create({
            data: {
                titulo,
                userId,
                note,
            }
        })
    }

    async findByTituloUserId(titulo: string, userId: number){
        return await this.prisma.notes.findFirst({
            where:{
                titulo,
                userId
            }
        })
    }

    async findAllByUserId(userId: number){
        return await this.prisma.notes.findMany({
            where: {userId}
        })
    }

    async findOneById(id: number){
        return await this.prisma.notes.findFirst({
            where: {id}
        })
    }

    async remove(id: number) {
        return await this.prisma.notes.delete({
            where: {id}
        })   
    }

    async removeAllByUserId(userId: number) {
        return await this.prisma.notes.deleteMany({
            where: {userId}
        })   
    }
}