import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AtribuirDesafioPartidaDto } from './dtos/atribuir-desafio-partida.dto';
import { Partida } from './interfaces/partida.interface';
import { PartidasService } from './partidas.service';

@Controller('partidas')
export class PartidasController {
  constructor(private readonly partidasService: PartidasService) {}

  @Post('/desafios/:idDesafio')
  @UsePipes(ValidationPipe)
  async atribuirDesafioPartida(
    @Param('idDesafio') idDesafio: string,
    @Body() atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
  ): Promise<Partida> {
    return await this.partidasService.atribuirDesafioPartida(
      idDesafio,
      atribuirDesafioPartidaDto,
    );
  }
}
