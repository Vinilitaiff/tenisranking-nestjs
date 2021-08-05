import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    nome: { type: String, unique: true },
    celular: String,
    ranking: String,
    posicaoRanking: Number,
    urlFoto: String,
  },
  { timestamps: true, collection: 'jogadores' },
);
