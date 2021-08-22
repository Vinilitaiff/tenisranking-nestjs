import { IsEmail, IsNotEmpty } from 'class-validator';

export class CriarJogadorDTO {
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly nome: string;

  @IsNotEmpty()
  readonly celular: string;
}
