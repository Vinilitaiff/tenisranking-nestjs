import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { Partida } from 'src/partidas/interfaces/partida.interface';
import { DesafioStatus } from '../enums/desafio-status.enum';

export class FinalizarDesafioDto {
  @IsNotEmpty()
  @IsIn([DesafioStatus.REALIZADO, DesafioStatus.NEGADO])
  status: DesafioStatus;

  @IsOptional()
  partida: Partida;
}
