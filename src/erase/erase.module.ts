import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { CardsRepository } from 'src/cards/cards.repository';
import { NotesRepository } from 'src/notes/notes.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CredentialRepository } from 'src/credentials/credentials.repository';

@Module({
  controllers: [EraseController],
  providers: [EraseService, CardsRepository, NotesRepository, UsersRepository, CredentialRepository],
})
export class EraseModule {}
