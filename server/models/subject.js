import mongoose from 'mongoose';

const RevDetailsSchema = new mongoose.Schema({
  data: { type: Date, default: null },
  questoesTotais: { type: Number, default: 0 },
  acertos: { type: Number, default: 0 }
});

const TopicSchema = new mongoose.Schema({
  assunto: { type: String, required: true },
  volume: { type: Number, required: true },
  frente: { type: Number, required: true },
  pinicial: { type: Number, required: true },
  pfinal: { type: Number, required: true },
  prop: { type: Number, required: true },
  stars: { type: Number, default: 0, min: 0, max: 5 },
  difficult: { type: Number, default: 0, min: 0, max: 5 },
  rate: { type: Number, default: 0 },
  view: { type: Date, default: null },
  revisoes: { type: Number, default: 0 },
  rev1: { type: Date, default: null },
  rev1details: { type: RevDetailsSchema, default: {} },
  concluido: { type: Boolean, default: false }
});

const SubjectSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  topics: [TopicSchema]
});

const CronogramaSchema = new mongoose.Schema({
  segunda: [{ type: String }],
  terça: [{ type: String }],
  quarta: [{ type: String }],
  quinta: [{ type: String }],
  sexta: [{ type: String }],
  sábado: [{ type: String }]
});

// Exportando os modelos
export const Subject = mongoose.model('Subject', SubjectSchema);
export const Cronograma = mongoose.model('Cronograma', CronogramaSchema);