import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { UpdateCredentialDto } from './dto/update-credential.dto';
import { UserGuard } from '../guard/user.guard';
import { User } from '../decorators/user.decorator';
import { Users } from '@prisma/client';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @ApiBearerAuth()
  @ApiResponse({status: HttpStatus.BAD_REQUEST, "description": "Erro no formado dos dados enviados"})
  @ApiResponse({status: HttpStatus.CONFLICT, "description": "Usuario já tem uma credencial como o mesmo titulo"})
  @ApiResponse({status: HttpStatus.UNAUTHORIZED, "description": "Usuario sem token de acesso"})
  @ApiOperation({summary: "Cria credencial de acesso ah contas"})
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createCredentialDto: CreateCredentialDto, @User() user: Users) {
    return this.credentialsService.create(createCredentialDto, user);
  }

  @ApiResponse({status: HttpStatus.NOT_FOUND, "description": "O usuairo não tem credenciais"})
  @ApiResponse({status: HttpStatus.OK, "description": "Retorna um vetor com todos as credenciais do usuario"})
  @ApiOperation({summary: "Retona todas as credenciais do usuario"})
  @UseGuards(UserGuard)
  @Get()
  findAll(@User() user: Users) {
    return this.credentialsService.findAll(user);
  }

  @ApiResponse({status: HttpStatus.NOT_FOUND, "description": "O usuairo não tem credencial"})
  @ApiResponse({status: HttpStatus.FORBIDDEN, "description": "O usuairo não é o dono da credencial"})
  @ApiResponse({status: HttpStatus.OK, "description": "Retorna a credencial do usuario com sucesso"})
  @ApiOperation({summary: "Retona uma credencial de acordo com id enviado"})
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @User() user: Users) {
    return this.credentialsService.findOne(+id, user);
  }

  @ApiResponse({status: HttpStatus.FORBIDDEN, "description": "O usuairo não é o dono da credencial"})
  @ApiResponse({status: HttpStatus.NOT_FOUND, "description": "A credncial não existe"})
  @ApiResponse({status: HttpStatus.OK, "description": "Deletou com sucesso"})
  @ApiOperation({summary: "Deleta um credncial de acordo com o id"})
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: Users) {
    return this.credentialsService.remove(+id, user);
  }
}
