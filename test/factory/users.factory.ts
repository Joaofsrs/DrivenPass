import { PrismaService } from '../../src/prisma/prisma.service';

export class UsersFactory {
    static async build(prisma: PrismaService) {
        return await prisma.users.create({
            data: {
                email: "teste@test.com",
                password: "@senhafortE*",
            },
        });
    }
}