import mongoose from 'mongoose';

const RevDetailsSchema = new mongoose.Schema({
  data: { type: Date, default: null },
  questoesTotais: { type: Number, default: 0 },
  acertos: { type: Number, default: 0 }
});

const daycontSchema = new mongoose.Schema({
  subject: {type: String}
});

const TopicSchema = new mongoose.Schema({
  assunto: { type: String, required: true },
  volume: { type: Number, required: true },
  frente: { type: Number, default: 1 },
  pinicial: { type: Number, required: true },
  pfinal: { type: Number, required: true },
  prop: { type: Number, default: 0 },
  stars: { type: Number, default: 0, min: 0, max: 5 },
  difficult: { type: Number, default: 0, min: 0, max: 5 },
  rate: { type: Number, default: 0 },
  questoesTotais: { type: Number, default: 0 },
  questoesCorretas: { type: Number, default: 0 },
  view: { type: Date, default: null },
  reviews: [RevDetailsSchema],
  concluido: { type: Boolean, default: false }
});

const DaySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  questoes: { type: Number, default: 0 },
  horas: { type: Number, default: 0 },
  conteudos: [daycontSchema]
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
  sábado: [{ type: String }],
  domingo: [{ type: String }]
});

export const Subject = mongoose.model('Subject', SubjectSchema)
export const Cronograma = mongoose.model('Cronograma', CronogramaSchema)
export const Day = mongoose.model('Day', DaySchema)