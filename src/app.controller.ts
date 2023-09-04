import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({status: HttpStatus.OK, "description": "Esta tudo certo"})
  @ApiOperation({summary: "Verifica saude da API"})
  @Get()
  getHello(): string {
    return this.appService.getHealth();
  }
}
