import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DesafiosService } from 'src/desafios/desafios.service';
import { DesafioStatus } from 'src/desafios/enums/desafio-status.enum';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { Partida } from './interfaces/partida.interface';

@Injectable()
export class PartidasService {
  constructor(
    @InjectModel('Partida') private readonly partidaModel: Model<Partida>,
    private readonly desafiosService: DesafiosService,
    private readonly jogadoresService: JogadoresService,
  ) {}

  async atribuirDesafioPartida(
    idDesafio: string,
    atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
  ): Promise<Partida> {
    const { def, resultado } = atribuirDesafioPartidaDto;

    const desafioCadastrado = await this.desafiosService.buscarDesafioPorId(
      idDesafio,
    );

    if (!desafioCadastrado.jogadores.includes(def)) {
      throw new BadRequestException(
        'Jogador vitorioso informado não pertece a este desafio',
      );
    }

    const partidaObj = {
      ...atribuirDesafioPartidaDto,
      jogadores: desafioCadastrado.jogadores,
      categoria: desafioCadastrado.categoria,
      resultado: resultado,
    };

    const partida = new this.partidaModel(partidaObj);

    this.desafiosService.finalizarDesafio(desafioCadastrado._id, {
      status: DesafioStatus.REALIZADO,
      partida: partida,
    });

    return partida.save();
  }
}
