import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Users } from '@prisma/client';
import { CardsRepository } from './cards.repository';

@Injectable()
export class CardsService {
  constructor(private readonly cardsRepository: CardsRepository){}

  async create(createCardDto: CreateCardDto, user: Users) {
    const card = await this.cardsRepository.findOneByTituloUserId(createCardDto.titulo, user.id);
    if(card){
      throw new ConflictException();
    }
    return await this.cardsRepository.create(createCardDto, user.id);
  }

  async findAll(user: Users)  {
    const cards = await this.cardsRepository.findAllByUserId(user.id);
    if(!cards){ 
      throw new NotFoundException();
    }
    return cards;
  }

  async findOne(id: number, user: Users) {
    const card = await this.cardsRepository.findOneById(id);
    if(!card){
      throw new NotFoundException();
    }
    if(card.userId !== user.id){
      throw new ForbiddenException()
    }
    return card;
  }

  async remove(id: number, user: Users) {
    const card = await this.cardsRepository.findOneById(id);
    if(!card){
      throw new NotFoundException();
    }
    if(card.userId !== user.id){
      throw new ForbiddenException()
    }
    return await this.cardsRepository.deleteById(id);
  }
}
