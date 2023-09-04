import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEraseDto } from './dto/create-erase.dto';
import { UpdateEraseDto } from './dto/update-erase.dto';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CardsRepository } from 'src/cards/cards.repository';
import { NotesRepository } from 'src/notes/notes.repository';
import { UsersRepository } from 'src/users/users.repository';
import { CredentialRepository } from 'src/credentials/credentials.repository';

@Injectable()
export class EraseService {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly notesRepository: NotesRepository,
    private readonly usersRepository: UsersRepository,
    private readonly credentialRepository: CredentialRepository
  ) {}
  async delete(createEraseDto: CreateEraseDto, user: Users) {
    const validPassword = await bcrypt.compare(createEraseDto.senha, user.password);
    if (!validPassword) {
      throw new UnauthorizedException();
    }
    await this.cardsRepository.removeAllByUserId(user.id);
    await this.notesRepository.removeAllByUserId(user.id);
    await this.usersRepository.remove(user.id);
    await this.credentialRepository.removeAllByUserId(user.id);
    return "sucesso";
  }
}
