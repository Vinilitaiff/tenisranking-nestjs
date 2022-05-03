import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriasService } from 'src/categorias/categorias.service';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtualizarDesafioDto } from './dtos/atualizar-desafio.dto';
import { CriarDesafioDto } from './dtos/criar-desafio.dto';
import { FinalizarDesafioDto } from './dtos/finalizar-desafio.dto';
import { DesafioStatus } from './enums/desafio-status.enum';
import { Desafio } from './interfaces/desafio.interface';

@Injectable()
export class DesafiosService {
  constructor(
    @InjectModel('Desafio') private readonly desafioModel: Model<Desafio>,
    private readonly jogadoresService: JogadoresService,
    private readonly categoriasService: CategoriasService,
  ) {}

  async buscarDesafioPorId(_id: string): Promise<Desafio> {
    const desafioCadastrado = await this.desafioModel
      .findOne({ _id: _id })
      .populate('jogadores')
      .populate('solicitante')
      .exec();

    if (!desafioCadastrado)
      throw new BadRequestException('Desafio não encontrado');

    return desafioCadastrado;
  }

  async criarDesafio(criarDesafioDto: CriarDesafioDto): Promise<Desafio> {
    const { jogadores, solicitante } = criarDesafioDto;

    const idsJogadores = jogadores.map((jogador) => jogador._id);

    if (!idsJogadores.includes(solicitante._id))
      throw new BadRequestException('O solicitante deve ser também um jogador');

    await this.jogadoresService.consultarJogadoresPorIds(idsJogadores);

    const categoriaDesafio =
      await this.categoriasService.buscarCategoriaDoJogador(solicitante._id);

    return new this.desafioModel({
      ...criarDesafioDto,
      status: DesafioStatus.PENDENTE,
      categoria: categoriaDesafio.categoria,
      dataHoraSolicitacao: new Date().toUTCString(),
    }).save();
  }

  async consultarDesafios(idJogador: string): Promise<Desafio[]> {
    if (idJogador)
      return await this.desafioModel
        .find()
        .populate('jogadores')
        .where('jogadores')
        .in([idJogador])
        .exec();

    return await this.desafioModel.find().populate('jogadores').exec();
  }

  async atualizarDesafio(
    _id: string,
    atualizarDesafioDto: AtualizarDesafioDto,
  ): Promise<void> {
    const desafioEncontrado = await this.desafioModel
      .findOne({ _id: _id })
      .exec();

    if (!desafioEncontrado)
      throw new BadRequestException('Desafio não encontrado');

    await this.desafioModel
      .findOneAndUpdate({ _id }, { $set: atualizarDesafioDto })
      .exec();
  }

  async finalizarDesafio(
    _id: string,
    finalizarDesafioDto: FinalizarDesafioDto,
  ): Promise<Desafio> {
    const desafioEncontrado = await this.desafioModel
      .findOne({ _id: _id })
      .exec();

    if (!desafioEncontrado)
      throw new BadRequestException('Desafio não encontrado');

    return await this.desafioModel
      .findByIdAndUpdate({ _id }, { $set: finalizarDesafioDto })
      .exec();
  }
}
