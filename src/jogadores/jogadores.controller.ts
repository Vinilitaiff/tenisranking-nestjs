import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ValidacaoParametrosPipes } from 'src/common/pipes/validacao-parametros.pipe';
import { AtualizarJogadorDTO } from './dtos/atualizar-jogador.dto';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarjogadorDTO: CriarJogadorDTO,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarjogadorDTO);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarjogadorDTO: AtualizarJogadorDTO,
    @Param('_id', ValidacaoParametrosPipes) _id: string,
  ): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, atualizarjogadorDTO);
  }

  @Get('/:_id')
  async consultarJogadoresPorId(
    @Param('_id', ValidacaoParametrosPipes) _id: string,
  ): Promise<Jogador | Jogador[]> {
    return this.jogadoresService.consultarJogadoresPorId(_id);
  }

  @Get()
  async consultarTodosJogadores(): Promise<Jogador | Jogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }

  @Delete('/:_id')
  async deletarJogador(
    @Param('_id', ValidacaoParametrosPipes) _id: string,
  ): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}
