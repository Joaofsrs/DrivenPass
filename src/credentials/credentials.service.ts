import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { CredentialRepository } from './credentials.repository';
import Cryptr from 'cryptr';
import { Users } from '@prisma/client';
import { NotFoundError } from 'rxjs';

@Injectable()
export class CredentialsService {
  private cryptr: Cryptr;

  constructor(private readonly credentialRepository: CredentialRepository){
    const Cryptr = require('cryptr');
    this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  }

  async create(createCredentialDto: CreateCredentialDto, user: Users) {
    const credential = await this.credentialRepository.findCredentialByTitulo(createCredentialDto);
    if(credential){
      throw new ConflictException();
    }

    return await this.credentialRepository.createCredential(createCredentialDto, user.id);
  }

  async findAll(user: Users) {
    const credential = await this.credentialRepository.findAllByUserid(user.id);
    if(!credential){
      throw new NotFoundException();
    }
    return credential;
  }

  async findOne(id: number, user: Users) {
    const credential = await this.credentialRepository.findOneById(id);
    if(!credential){
      throw new NotFoundException();
    }
    if(credential.userId !== user.id){
      throw new ForbiddenException();
    }
    return credential;
  }

  async remove(id: number, user: Users) {
    const credential = await this.credentialRepository.findOneById(id);
    if(!credential){
      throw new NotFoundException();
    }
    if(credential.userId !== user.id){
      throw new ForbiddenException();
    }
    return await this.credentialRepository.delete(id);
  }
}
