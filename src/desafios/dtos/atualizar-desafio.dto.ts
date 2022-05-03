import { IsDateString, IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { DesafioStatus } from '../enums/desafio-status.enum';

export class AtualizarDesafioDto {
  @IsNotEmpty()
  @IsDateString()
  dataHoraDesafio: Date;

  @IsIn([DesafioStatus.ACEITO, DesafioStatus.NEGADO, DesafioStatus.CANCELADO])
  status: DesafioStatus;
}
