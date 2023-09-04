import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponse({status: HttpStatus.CREATED, "description": "Usuario Criado"})
  @ApiResponse({status: HttpStatus.CONFLICT, "description": "Usuario já existente"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, "description": "Erro com tipo de objeto enviado"})
  @ApiOperation({summary: "Cria um novo usuario"})
  @Post('sign-up')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponse({status: HttpStatus.OK, "description": "Entrou com usuario"})
  @ApiResponse({status: HttpStatus.BAD_REQUEST, "description": "Erro com tipo de objeto enviado"})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, "description": "Usuario ou senha invalida"})
  @ApiOperation({summary: "Faz o login no sistema"})
  @Post('sign-in')
  login(@Body() createUserDto: CreateUserDto) {
    return this.usersService.login(createUserDto);
  }
}
