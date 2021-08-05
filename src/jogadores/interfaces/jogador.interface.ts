import { Document } from 'mongoose';

export interface Jogador extends Document {
  readonly _id: string;
  readonly celular: string;
  readonly email: string;
  nome: string;
  ranking: string;
  posicaoRanking: number;
  urlFoto: string;
}
