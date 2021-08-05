import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
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
  async consultarJogadoresPorEmail(
    @Query('email') email: string,
  ): Promise<Jogador | Jogador[]> {
    if (email) {
      return this.jogadoresService.consultarJogadoresPorEmail(email);
    } else {
      return this.jogadoresService.consultarTodosJogadores();
    }
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    await this.jogadoresService.deletarJogador(email);
  }
}
