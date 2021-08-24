import { Param, Put } from '@nestjs/common';
import { Get } from '@nestjs/common';
import {
  Post,
  ValidationPipe,
  Body,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
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
    return await this.categoriasService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async consultarCategoria(): Promise<Array<Categoria>> {
    return await this.categoriasService.consultarTodasCategorias();
  }

  @Get('/:categoria')
  async consultarCategoriaPeloId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriasService.consultarCategoriasPeloId(categoria);
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
    @Param('categoria') categoria: string,
  ): Promise<void> {
    return await this.categoriasService.atualizarCategoria(
      categoria,
      atualizarCategoriaDto,
    );
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
    return await this.categoriasService.atribuirCategoriaJogador(params);
  }
}
