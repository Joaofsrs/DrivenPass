import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateCardDto } from "./dto/create-card.dto";

@Injectable()
export class CardsRepository{
    constructor(private readonly prisma: PrismaService){}

    async create(card: CreateCardDto, userId: number){
        const {
            titulo,
            number,
            name,
            csv,
            validade,
            senha,
            tipo,
        } = card;
        return await this.prisma.cards.create({
            data: {
                titulo,
                number,
                name,
                csv,
                validade,
                senha,
                tipo,
                userId
            }
        })
    }

    async findAllByUserId(userId: number){
        return await this.prisma.cards.findMany({
            where: {userId}
        })
    }

    async findOneById(id: number){
        return await this.prisma.cards.findFirst({
            where: {id}
        })
    }

    async findOneByTituloUserId(titulo: string, userId: number){
        return await this.prisma.cards.findFirst({
            where: {titulo, userId}
        })
    }

    async deleteById(id: number){
        return await this.prisma.cards.delete({
            where: {id}
        })
    }

    async removeAllByUserId(userId: number) {
        return await this.prisma.cards.deleteMany({
            where: {userId}
        })   
    }
}