import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EraseService } from './erase.service';
import { CreateEraseDto } from './dto/create-erase.dto';
import { UpdateEraseDto } from './dto/update-erase.dto';
import { UserGuard } from '../guard/user.guard';
import { User } from '../decorators/user.decorator';
import { Users } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Erase')
@Controller('erase')
export class EraseController {
  constructor(private readonly eraseService: EraseService) {}

  @UseGuards(UserGuard)
  @Delete()
  create(@Body() createEraseDto: CreateEraseDto, @User() user: Users) {
    return this.eraseService.delete(createEraseDto, user);
  }
}
