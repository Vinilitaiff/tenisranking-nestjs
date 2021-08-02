import { Body, Controller, Get, Post } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(@Body() criarjogadorDTO: CriarJogadorDTO) {
    await this.jogadoresService.criarAtualizarJogador(criarjogadorDTO);
  }

  @Get()
  async consultarJogadores(@Body() Jogador: Jogador): Promise<Jogador[]> {
    return this.jogadoresService.consultarTodosJogadores();
  }
}
