import * as mongoose from 'mongoose';

export const DesafioSchema = new mongoose.Schema(
  {
    dataHoraDesafio: Date,
    dataHoraSolicitacao: Date,
    dataHoraResposta: Date,
    solicitante: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogador' },
    categoria: String,
    jogadores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jogador',
      },
    ],
    partida: { type: mongoose.Schema.Types.ObjectId, ref: 'Partida' },
    status: String,
  },
  {
    timestamps: true,
    collection: 'desafios',
  },
);
