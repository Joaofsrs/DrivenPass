import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CreateCredentialDto } from "./dto/create-credential.dto";

@Injectable()
export class UserSRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createCredential(createCredentialDto: CreateCredentialDto) {
        return await this.prisma.credentials.create({
            data: createCredentialDto
        })
    }

    async findCredentialByTitulo(credential: CreateCredentialDto) {
        const { titulo } = credential;
        return await this.prisma.credentials.findFirst({
            where: { titulo }
        })
    }
}