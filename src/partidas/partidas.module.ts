import { Module } from '@nestjs/common';
import { PartidasService } from './partidas.service';
import { PartidasController } from './partidas.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PartidaSchema } from './interfaces/partida.schema';
import { DesafiosModule } from 'src/desafios/desafios.module';
import { JogadoresModule } from 'src/jogadores/jogadores.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Partida', schema: PartidaSchema }]),
    DesafiosModule,
    JogadoresModule,
  ],
  providers: [PartidasService],
  controllers: [PartidasController],
})
export class PartidasModule {}
