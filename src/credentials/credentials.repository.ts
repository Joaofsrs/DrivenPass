import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CreateCredentialDto } from "./dto/create-credential.dto";
import Cryptr from "cryptr";
import * as dotenv from 'dotenv';

dotenv.config();
@Injectable()
export class CredentialRepository {
    private cryptr: Cryptr
    constructor(private readonly prisma: PrismaService,) { 
        const Cryptr = require('cryptr');
        this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
    }

    async createCredential(createCredentialDto: CreateCredentialDto, userId: number) {
        const { titulo, url, user, senha } = createCredentialDto;
        const senhaSegura = this.cryptr.encrypt(senha);
        return await this.prisma.credentials.create({
            data: {
                titulo,
                url,
                user,
                senha: senhaSegura,
                userId
            }
        })
    }

    async findCredentialByTitulo(credential: CreateCredentialDto) {
        const { titulo } = credential;
        return await this.prisma.credentials.findFirst({
            where: { titulo }
        })
    }

    async findAllByUserid(id: number){
        return await this.prisma.credentials.findMany({
            where: {
                userId: id
            }
        })
    }

    async findOneById(id: number){
        return await this.prisma.credentials.findFirst({
            where: {id}
        })
    }

    async delete(id: number){
        return await this.prisma.credentials.delete({
            where: {id}
        })
    }
}