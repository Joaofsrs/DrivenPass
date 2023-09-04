import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { CredentialsModule } from '../src/credentials/credentials.module';
import { CardsModule } from '../src/cards/cards.module';
import { NotesModule } from '../src/notes/notes.module';
import { UsersModule } from '../src/users/users.module';
import { UsersFactory } from './factory/users.factory';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CredentialsModule, CardsModule, NotesModule, UsersModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe())
    prisma = await moduleFixture.resolve(PrismaService);

    await prisma.cards.deleteMany();
    await prisma.credentials.deleteMany();
    await prisma.notes.deleteMany();
    await prisma.users.deleteMany();

    await app.init();
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect("I’m okay!");
  });

  describe('Users Test', () => {
    it('/users/sign-up (POST) faltando argumentos', async () => {
      await request(app.getHttpServer())
        .post('/users/sign-up')
        .send({
          email: "teset@teste.com"
        })
        .expect(HttpStatus.BAD_REQUEST)

      const medias = await prisma.users.findMany();
      expect(medias).toEqual([]);
    });
    it('/users/sign-up (POST) todos os argumentos', async () => {
      await request(app.getHttpServer())
        .post('/users/sign-up')
        .send({
          "email": "zadsade@ze.com",
          "password": "@Ab344Hdwsd5*"
        })
        .expect(HttpStatus.CREATED)

      const medias = await prisma.users.findMany();
      expect(medias).toEqual([{
        id: expect.any(Number),
        email: "zadsade@ze.com",
        password: expect.any(String),
      }]);
    });
  })
});
