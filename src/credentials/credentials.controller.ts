import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { UserGuard } from '../guard/user.guard';
import { User } from 'src/decorators/user.decorator';
import { Users } from '@prisma/client';

@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @UseGuards(UserGuard)
  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto, @User() user: Users) {
    return this.credentialsService.create(createCredentialDto, user);
  }

  @UseGuards(UserGuard)
  @Get()
  findAll(@User() user: Users) {
    return this.credentialsService.findAll(user);
  }

  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: Users) {
    return this.credentialsService.findOne(+id, user);
  }

  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: Users) {
    return this.credentialsService.remove(+id, user);
  }
}
