import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';
import { DesafiosController } from './desafios/desafios.controller';
import { DesafiosModule } from './desafios/desafios.module';
import { PartidasModule } from './partidas/partidas.module';

@Module({
  imports: [
    JogadoresModule,
    CategoriasModule,
    DesafiosModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.zhlc4.mongodb.net/tenisranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    ),
    PartidasModule,
  ],
  controllers: [DesafiosController],
  providers: [],
})
export class AppModule {}
