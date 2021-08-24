import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async criarCategoria(criarJogadorDto: CriarCategoriaDto): Promise<Categoria> {
    try {
      console.log('entrei aqui');
      const { categoria } = criarJogadorDto;

      const categoriaEncontrada = await this.categoriaModel.findOne({
        categoria,
      });

      if (categoriaEncontrada) {
        throw new BadRequestException(`Categoria ${categoria} já cadastrada`);
      }

      const categodiaCriada = new this.categoriaModel(criarJogadorDto);

      return await categodiaCriada.save();
    } catch (error) {
      console.log(error);
    }
  }

  async consultarTodasCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaModel.find().populate('jogadores').exec();
  }

  async consultarCategoriasPeloId(categoria: string): Promise<Categoria> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada`);
    }
    return categoriaEncontrada;
  }

  async atualizarCategoria(
    categoria: string,
    atualizarCategoria: AtualizarCategoriaDto,
  ): Promise<void> {
    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();

    if (!categoriaEncontrada) {
      throw new NotFoundException(`Categoria ${categoria} não encontrada`);
    }

    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: atualizarCategoria })
      .exec();
  }

  async atribuirCategoriaJogador(params: string[]): Promise<void> {
    const categoria = params['categoria'];
    const idJogador = params['idJogador'];

    const categoriaEncontrada = await this.categoriaModel
      .findOne({
        categoria,
      })
      .exec();

    const jogadorEncontradoNaCategoria = await this.categoriaModel
      .find({
        categoria,
      })
      .where('jogadores')
      .in(idJogador)
      .exec();

    await this.jogadoresService.consultarJogadoresPorId(idJogador);

    if (!categoriaEncontrada) {
      throw new BadRequestException(`Categoria ${categoria} não encontrada`);
    }

    if (jogadorEncontradoNaCategoria.length > 0) {
      throw new BadRequestException(
        `Jogador ${idJogador} já cadastrado na categoria ${categoria}`,
      );
    }

    categoriaEncontrada.jogadores.push(idJogador);

    await this.categoriaModel
      .findOneAndUpdate({ categoria }, { $set: categoriaEncontrada })
      .exec();
  }
}
