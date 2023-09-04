import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createUser(user: CreateUserDto) {
        const password = bcrypt.hashSync(user.password, 10)
        await this.prisma.users.create({
            data: {
                email: user.email,
                password: password
            }
        })
    }

    async findUserByEmail(user: CreateUserDto){
        const { email } = user
        return await this.prisma.users.findUnique({
            where: {email}
        })
    }

    async getUserById(id: number){
        return await this.prisma.users.findFirst({
            where: {
                id
            }
        })
    }

    async remove(id: number) {
        return await this.prisma.users.delete({
            where: {id}
        })   
    }
}