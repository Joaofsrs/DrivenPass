import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Users } from '@prisma/client';
import { NotesRepository } from './notes.repository';

@Injectable()
export class NotesService {
  constructor(private readonly notesRepository: NotesRepository) { }

  async create(createNoteDto: CreateNoteDto, user: Users) {
    const note = await this.notesRepository.findByTituloUserId(createNoteDto.titulo, user.id);
    if(note){
      throw new ConflictException()
    }
    return await this.notesRepository.create(createNoteDto, user.id);
  }

  async findAll(user: Users) {
    const notes = await this.notesRepository.findAllByUserId(user.id);
    if(!notes){
      throw new NotFoundException();
    }
    return notes;
  }

  async findOne(id: number, user: Users) {
    const note = await this.notesRepository.findOneById(id);
    if(!note){
      throw new NotFoundException();
    }
    if(note.userId !== user.id){
      throw new ForbiddenException();
    }
    return note;
  }

  async remove(id: number, user: Users) {
    const note = await this.notesRepository.findOneById(id);
    if(!note){
      throw new NotFoundException();
    }
    if(note.userId !== user.id){
      throw new ForbiddenException();
    }
    return await this.notesRepository.remove(id);
  }
}
