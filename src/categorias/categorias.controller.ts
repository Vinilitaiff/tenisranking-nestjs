import {
  Post,
  ValidationPipe,
  Body,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriasService.CriarCategoria(criarCategoriaDto);
  }
}
