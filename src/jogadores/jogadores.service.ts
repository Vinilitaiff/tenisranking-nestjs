import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CriarJogadorDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AtualizarJogadorDTO } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarJogador(criarJogadorDto: CriarJogadorDTO): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();
    if (jogadorEncontrado) {
      throw new BadRequestException(`Jogador com email já cadastrado`);
    }

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  async atualizarJogador(
    _id: string,
    atualizarJogadorDTO: AtualizarJogadorDTO,
  ): Promise<void> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new BadRequestException(`Jogador com id ${_id} não encontrado`);
    }

    await this.jogadorModel
      .findOneAndUpdate({ _id }, { $set: atualizarJogadorDTO })
      .exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPorId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findById({ _id }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id: string): Promise<any> {
    return await this.jogadorModel.deleteOne({ _id }).exec();
  }
}
