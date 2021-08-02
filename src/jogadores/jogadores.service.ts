import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDTO): Promise<void> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado) {
      await this.criar(criarJogadorDto);
    } else {
      await this.atualizar(jogadorEncontrado, criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  private async criar(criarJogadorDto: CriarJogadorDTO): Promise<void> {
    const { nome, email, celular } = criarJogadorDto;
    const jogador: Jogador = {
      _id: uuidv4(),
      nome,
      celular,
      email,
      posicaoRanking: 10,
      ranking: 'A',
      urlFoto: 'www.google.com/fotojogador',
    };
    this.logger.log(`criarJogadorDTO: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  private async atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDTO,
  ): Promise<void> {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;
  }
}
