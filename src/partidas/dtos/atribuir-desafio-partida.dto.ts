import { IsNotEmpty, isNotEmpty } from 'class-validator';
import { Resultado } from 'src/desafios/interfaces/desafio.interface';
import { Jogador } from 'src/jogadores/interfaces/jogador.interface';

export class AtribuirDesafioPartidaDto {
  @IsNotEmpty()
  def: Jogador;

  @IsNotEmpty()
  resultado: Array<Resultado>;
}
