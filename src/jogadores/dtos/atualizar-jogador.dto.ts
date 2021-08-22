import { IsNotEmpty } from 'class-validator';

export class AtualizarJogadorDTO {
  @IsNotEmpty()
  readonly nome: string;

  @IsNotEmpty()
  readonly celular: string;
}
