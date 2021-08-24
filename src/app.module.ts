import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    JogadoresModule,
    CategoriasModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.zhlc4.mongodb.net/tenisranking?retryWrites=true&w=majority',
      { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
