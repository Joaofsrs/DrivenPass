import { Module } from '@nestjs/common';
import { EraseService } from './erase.service';
import { EraseController } from './erase.controller';
import { CardsRepository } from '../cards/cards.repository';
import { NotesRepository } from '../notes/notes.repository';
import { UsersRepository } from '../users/users.repository';
import { CredentialRepository } from '../credentials/credentials.repository';

@Module({
  controllers: [EraseController],
  providers: [EraseService, CardsRepository, NotesRepository, UsersRepository, CredentialRepository],
})
export class EraseModule {}
