import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DesafiosService } from './desafios.service';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { Desafio } from './interfaces/desafio.interface';

@Controller('desafios')
export class DesafiosController {
  constructor(private readonly desafiosService: DesafiosService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarDesafio(
    @Body() criarDesafioDto: CriarDesafioDto,
  ): Promise<Desafio> {
    return await this.desafiosService.criarDesafio(criarDesafioDto);
  }

  @Get('/:_id')
  async consultarDesafioPorId(@Param('_id') _id: string): Promise<Desafio> {
    return await this.desafiosService.buscarDesafioPorId(_id);
  }

  @Get()
  async consultarDesafios(@Query('idJogador') idJogador: string) {
    return await this.desafiosService.consultarDesafios(idJogador);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarDesafio(
    @Param('_id') _id: string,
    @Body() atualizarDesafioDto: AtualizarDesafioDto,
  ): Promise<void> {
    await this.desafiosService.atualizarDesafio(_id, atualizarDesafioDto);
  }
}
