import { Jogador } from 'src/jogadores/interfaces/jogador.interface';
import { Resultado } from 'src/desafios/interfaces/desafio.interface';
import { Document } from 'mongoose';

export interface Partida extends Document {
  categoria: string;
  jogadores: Array<Jogador>;
  def: Jogador;
  resultado: Array<Resultado>;
}
