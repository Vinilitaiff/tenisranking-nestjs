import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Evento } from '../interfaces/categoria.interface';

export class CriarCategoriaDto {
  @IsNotEmpty()
  @IsString()
  readonly categoria: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsArray()
  @ArrayMinSize(1)
  eventos: Array<Evento>;
}
