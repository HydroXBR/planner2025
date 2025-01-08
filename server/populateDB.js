import mongoose from 'mongoose';
import { Subject, Cronograma } from './models/subject.js';
const userMongoDB = "plannerpsy1518"
const passwordMongoDB = "psy1518"
const databaseMongoDB = "plannerDB"

const uri = `mongodb+srv://${userMongoDB}:${passwordMongoDB}@cluster0.w4fuw.mongodb.net/${databaseMongoDB}?retryWrites=true&w=majority`

async function populateDatabase() {
    try {
        await mongoose.connect(uri);
        console.log('🔥 Conectado ao MongoDB');

        await Subject.insertMany([
            /*{
              subject: "Biologia",
              topics: [
                { assunto: "Organização dos Seres Vivos e Bioenergética", volume: 1, frente: 1, pinicial: 6, pfinal: 9, prop: 13, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Evolução: conceitos e evidências", volume: 1, frente: 2, pinicial: 88, pfinal: 95, prop: 99, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Classificação dos Seres Vivos e Introdução à Biologia", volume: 1, frente: 3, pinicial: 200, pfinal: 205, prop: 210, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Noções de material genético e núcleo", volume: 1, frente: 1, pinicial: 22, pfinal: 26, prop: 28, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Evolução", volume: 1, frente: 2, pinicial: 114, pfinal: 117, prop: 119, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Fundamentos da Ecologia", volume: 1, frente: 2, pinicial: 130, pfinal: 132, prop: 134, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Protozoários e protozooses", volume: 1, frente: 3, pinicial: 228, pfinal: 231, prop: 237, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Divisão Celular: Mitose e meiose", volume: 1, frente: 1, pinicial: 36, pfinal: 42, prop: 47, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "A geração de vida e o Método Científico", volume: 1, frente: 1, pinicial: 62, pfinal: 64, prop: 65, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Energia e matéria no ecossistema", volume: 1, frente: 2, pinicial: 142, pfinal: 144, prop: 150, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Embriologia dos animais", volume: 1, frente: 3, pinicial: 256, pfinal: 261, prop: 264, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Composição Química dos Seres Vivos", volume: 1, frente: 1, pinicial: 72, pfinal: 75, prop: 79, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Populações, comunidades e sucessão ecológica", volume: 1, frente: 2, pinicial: 168, pfinal: 175, prop: 179, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Zoologia dos invertebrados 1", volume: 1, frente: 3, pinicial: 278, pfinal: 289, prop: 294, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Proteínas", volume: 2, frente: 1, pinicial: 6, pfinal: 11, prop: 13, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Ácidos nucleicos e síntese de proteínas", volume: 2, frente: 1, pinicial: 20, pfinal: 26, prop: 28, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "O ser humano e o ambiente", volume: 2, frente: 2, pinicial: 118, pfinal: 130, prop: 135, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Zoologia dos invertebrados 2", volume: 2, frente: 3, pinicial: 248, pfinal: 264, prop: 266, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Bioenergética", volume: 2, frente: 1, pinicial: 44, pfinal: 51, prop: 54, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Procariontes: bactérias e arqueas", volume: 2, frente: 2, pinicial: 160, pfinal: 163, prop: 164, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Vírus", volume: 2, frente: 2, pinicial: 178, pfinal: 182, prop: 184, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Fungos e algas", volume: 2, frente: 2, pinicial: 198, pfinal: 202, prop: 204, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Zoologia dos vertebrados", volume: 2, frente: 3, pinicial: 294, pfinal: 308, prop: 311, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Origem dos primeiros seres vivos", volume: 2, frente: 1, pinicial: 76, pfinal: 77, prop: 79, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Citoplasma e hipótese da endossibiose", volume: 2, frente: 1, pinicial: 90, pfinal: 94, prop: 96, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Plantas e ciclos reprodutivos", volume: 2, frente: 2, pinicial: 216, pfinal: 216, prop: 218, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Digestão e respiração", volume: 2, frente: 3, pinicial: 332, pfinal: 340, prop: 343, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Os envoltórios celulares", volume: 2, frente: 1, pinicial: 110, pfinal: 111, prop: 112, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Briófitas e pteridófitas", volume: 2, frente: 2, pinicial: 224, pfinal: 226, prop: 228, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Gimnospermas", volume: 2, frente: 2, pinicial: 238, pfinal: 239, prop: 241, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "O transporte através da membrana", volume: 3, frente: 1, pinicial: 6, pfinal: 9, prop: 10, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Angiospermas", volume: 3, frente: 2, pinicial: 66, pfinal: 74, prop: 77, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Circulação e imunidade", volume: 3, frente: 3, pinicial: 150, pfinal: 165, prop: 166, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Introdução à Genética clássica", volume: 3, frente: 1, pinicial: 18, pfinal: 24, prop: 25, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Morfologia externa das plantas", volume: 3, frente: 2, pinicial: 88, pfinal: 109, prop: 94, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Tecidos vegetais", volume: 3, frente: 2, pinicial: 104, pfinal: 106, prop: 107, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Excreção e sistema urinário", volume: 3, frente: 3, pinicial: 190, pfinal: 194, prop: 196, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "As variações da primeira lei de Mendel", volume: 3, frente: 1, pinicial: 36, pfinal: 38, prop: 39, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Nutrição e secreção vegetal", volume: 3, frente: 2, pinicial: 114, pfinal: 118, prop: 120, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Sistemas de controle I", volume: 3, frente: 3, pinicial: 212, pfinal: 222, prop: 224, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Alelos múltiplos", volume: 3, frente: 1, pinicial: 46, pfinal: 50, prop: 52, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Revestimentos e trocas gasosas", volume: 3, frente: 2, pinicial: 132, pfinal: 136, prop: 137, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Sistemas de controle II", volume: 4, frente: 3, pinicial: 172, pfinal: 178, prop: 179, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Segunda Lei de Mendel", volume: 4, frente: 1, pinicial: 6, pfinal: 8, prop: 9, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Interações gênicas", volume: 4, frente: 1, pinicial: 20, pfinal: 24, prop: 26, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Linkage e mapas gênicos", volume: 4, frente: 1, pinicial: 36, pfinal: 39, prop: 41, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Genoma humano e cromossomos sexuais", volume: 4, frente: 1, pinicial: 50, pfinal: 54, prop: 56, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Mutações gênicas e cromossômicas", volume: 4, frente: 1, pinicial: 70, pfinal: 73, prop: 74, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Genética das populações", volume: 4, frente: 1, pinicial: 84, pfinal: 86, prop: 87, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Transporte e sustentação em plantas", volume: 4, frente: 2, pinicial: 96, pfinal: 101, prop: 103, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Hormônios vegetais", volume: 4, frente: 2, pinicial: 114, pfinal: 117, prop: 119, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Movimentos vegetais e fotoperiodismo", volume: 4, frente: 2, pinicial: 130, pfinal: 134, prop: 136, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Plantas e ambiente", volume: 4, frente: 2, pinicial: 144, pfinal: 154, prop: 157, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Sistemas de controle II", volume: 4, frente: 3, pinicial: 172, pfinal: 178, prop: 179, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Reprodução Humana", volume: 4, frente: 3, pinicial: 196, pfinal: 201, prop: 203, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Histologia Animal", volume: 4, frente: 3, pinicial: 222, pfinal: 231, prop: 232, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false }
              ]
            },
            {
              subject: "Física",
              topics: [
                { assunto: "Introdução à Cinemática", volume: 1, frente: 1, pinicial: 6, pfinal: 12, prop: 13, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "A natureza elétrica da matéria e a Lei de Coloumb", volume: 1, frente: 2, pinicial: 132, pfinal: 147, prop: 148, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Termometria", volume: 1, frente: 3, pinicial: 256, pfinal: 263, prop: 265, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Movimento Uniforme", volume: 1, frente: 1, pinicial: 26, pfinal: 28, prop: 30, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Campo elétrico", volume: 1, frente: 2, pinicial: 166, pfinal: 178, prop: 179, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Dilatação térmica", volume: 1, frente: 3, pinicial: 274, pfinal: 283, prop: 285, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Movimento Uniformemente Variado", volume: 1, frente: 1, pinicial: 42, pfinal: 51, prop: 54, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Potencial Elétrico", volume: 1, frente: 2, pinicial: 196, pfinal: 210, prop: 212, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Calorimetria", volume: 1, frente: 3, pinicial: 298, pfinal: 304, prop: 307, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Análise Gráfica", volume: 1, frente: 1, pinicial: 68, pfinal: 77, prop: 79, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Corrente elétrica", volume: 1, frente: 2, pinicial: 232, pfinal: 263, prop: 242, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Mudanças de estado físico", volume: 1, frente: 3, pinicial: 320, pfinal: 328, prop: 332, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Movimento Circular", volume: 1, frente: 1, pinicial: 108, pfinal: 115, prop: 116, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Transferência de calor", volume: 1, frente: 3, pinicial: 342, pfinal: 350, prop: 353, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Gases e termodinâmica", volume: 1, frente: 3, pinicial: 364, pfinal: 383, prop: 385, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Cinemática Vetorial", volume: 2, frente: 1, pinicial: 6, pfinal: 21, prop: 23, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Resistores", volume: 2, frente: 2, pinicial: 132, pfinal: 146, prop: 132, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Óptica geométrica", volume: 2, frente: 3, pinicial: 258, pfinal: 268, prop: 271, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Lançamento Oblíquo no Vácuo", volume: 2, frente: 1, pinicial: 46, pfinal: 51, prop: 54, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Circuitos elétricos", volume: 2, frente: 2, pinicial: 166, pfinal: 181, prop: 183, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Reflexão da luz", volume: 2, frente: 3, pinicial: 278, pfinal: 298, prop: 300, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Dinâmica", volume: 2, frente: 1, pinicial: 74, pfinal: 89, prop: 93, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Interação entre cargas elétricas e campo magnético", volume: 2, frente: 2, pinicial: 210, pfinal: 213, prop: 215, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Refração da luz", volume: 2, frente: 3, pinicial: 324, pfinal: 339, prop: 341, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Fontes de campo magnético", volume: 2, frente: 2, pinicial: 234, pfinal: 238, prop: 239, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Força de atrito e dinâmica no Movimento Circular", volume: 3, frente: 1, pinicial: 6, pfinal: 14, prop: 20, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Forças magnéticas e indução magnética", volume: 3, frente: 2, pinicial: 122, pfinal: 135, prop: 137, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Óptica da visão e instrumentos ópticos", volume: 3, frente: 3, pinicial: 228, pfinal: 242, prop: 244, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Trabalho, potência e energia", volume: 3, frente: 1, pinicial: 52, pfinal: 68, prop: 76, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Gravitação", volume: 3, frente: 2, pinicial: 166, pfinal: 187, prop: 190, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Movimentos oscilatórios periódicos", volume: 3, frente: 3, pinicial: 264, pfinal: 275, prop: 277, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Introdução à Ondulatória", volume: 3, frente: 3, pinicial: 292, pfinal: 301, prop: 303, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Impulso, quantidade de movimento, colisões, centro de massa e análise dimensional", volume: 4, frente: 1, pinicial: 6, pfinal: 16, prop: 22, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Estática", volume: 4, frente: 2, pinicial: 66, pfinal: 84, prop: 87, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Ondas periódicas", volume: 4, frente: 3, pinicial: 182, pfinal: 190, prop: 193, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Hidrostática", volume: 4, frente: 2, pinicial: 124, pfinal: 140, prop: 144, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Interferência", volume: 4, frente: 3, pinicial: 208, pfinal: 216, prop: 219, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Acústica", volume: 4, frente: 3, pinicial: 238, pfinal: 249, prop: 251, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false }
                ]
              },
              {
                subject: "Química",
                topics: [
                  { assunto: "O átomo", volume: 1, frente: 1, pinicial: 6, pfinal: 23, prop: 26, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Tabela periódica", volume: 1, frente: 1, pinicial: 54, pfinal: 65, prop: 67, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Ligações químicas", volume: 1, frente: 1, pinicial: 90, pfinal: 109, prop: 113, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Estados físicos e suas mudanças", volume: 1, frente: 1, pinicial: 160, pfinal: 172, prop: 173, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Determinação de fórmulas", volume: 1, frente: 2, pinicial: 196, pfinal: 199, prop: 201, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Cálculo estequiométrico", volume: 1, frente: 2, pinicial: 210, pfinal: 216, prop: 218, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Teoria atômico-molecular", volume: 1, frente: 3, pinicial: 246, pfinal: 252, prop: 255, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Gases", volume: 1, frente: 3, pinicial: 268, pfinal: 288, prop: 291, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                  { assunto: "Termoquímica", volume: 1, frente: 3, pinicial: 322, pfinal: 334, prop: 339, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false }
                ]
              },
             {
              subject: "Geografia",
              topics: [
                { assunto: "Noções espaciais e de cartografia", volume: 1, frente: 1, pinicial: 6, pfinal: 24, prop: 25, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Espaço geográfico", volume: 1, frente: 2, pinicial: 138, pfinal: 148, prop: 148, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Geomorfologia", volume: 1, frente: 1, pinicial: 46, pfinal: 71, prop: 74, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Globalização", volume: 1, frente: 2, pinicial: 158, pfinal: 177, prop: 177, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Solos", volume: 1, frente: 1, pinicial: 98, pfinal: 108, prop: 108, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Indústria I", volume: 1, frente: 2, pinicial: 206, pfinal: 241, prop: 241, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Mineração", volume: 1, frente: 1, pinicial: 118, pfinal: 127, prop: 127, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Indústria II", volume: 1, frente: 2, pinicial: 206, pfinal: 241, prop: 241, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Climatologia", volume: 2, frente: 1, pinicial: 6, pfinal: 26, prop: 27, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Geografia Agrária - Sist. Agrícolas, Panorama", volume: 2, frente: 2, pinicial: 136, pfinal: 150, prop: 174, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Geografia Agrária - Campo, questão agrária", volume: 2, frente: 2, pinicial: 151, pfinal: 173, prop: 174, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Hidrografia I", volume: 2, frente: 1, pinicial: 51, pfinal: 68, prop: 78, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Energia - uso, desigualdade, tipos, matriz", volume: 2, frente: 2, pinicial: 192, pfinal: 195, prop: 230, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Energia - fósseis, fontes, petróleo", volume: 2, frente: 2, pinicial: 196, pfinal: 210, prop: 230, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Hidrografia II", volume: 2, frente: 1, pinicial: 69, pfinal: 76, prop: 78, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Energia - Petróleo no Brasil, Energia no Brasil", volume: 2, frente: 2, pinicial: 211, pfinal: 228, prop: 230, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Biogeografia I", volume: 2, frente: 1, pinicial: 98, pfinal: 103, prop: 118, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Redes de transporte e de comunicação - comunic.", volume: 2, frente: 2, pinicial: 254, pfinal: 261, prop: 278, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Biogeografia II", volume: 2, frente: 1, pinicial: 104, pfinal: 116, prop: 118, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Relações internacionais", volume: 2, frente: 2, pinicial: 290, pfinal: 297, prop: 298, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Demografia - Estudos a Pirâmides", volume: 3, frente: 1, pinicial: 6, pfinal: 19, prop: 32, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Urbanização I - Cidade a urbanização", volume: 3, frente: 2, pinicial: 58, pfinal: 66, prop: 75, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Urbanização I - Redes e metropolização", volume: 3, frente: 2, pinicial: 67, pfinal: 74, prop: 75, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Demografia - Estrutura e imigração brasileira", volume: 3, frente: 1, pinicial: 20, pfinal: 31, prop: 32, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Ordem Mundial", volume: 3, frente: 2, pinicial: 92, pfinal: 126, prop: 128, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "África I", volume: 3, frente: 2, pinicial: 162, pfinal: 176, prop: 176, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Urbanização II", volume: 4, frente: 1, pinicial: 5, pfinal: 23, prop: 24, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "África II", volume: 4, frente: 2, pinicial: 106, pfinal: 116, prop: 117, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Questões ambientais I", volume: 4, frente: 1, pinicial: 42, pfinal: 51, prop: 58, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Oriente Médio", volume: 4, frente: 2, pinicial: 128, pfinal: 147, prop: 146, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Questões ambientais II", volume: 4, frente: 1, pinicial: 52, pfinal: 58, prop: 58, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Regionalização do Brasil", volume: 4, frente: 1, pinicial: 74, pfinal: 90, prop: 91, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "América Latina", volume: 4, frente: 2, pinicial: 170, pfinal: 185, prop: 187, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false }
              ]
             }
            {
              subject: "Filosofia",
              topics: [
                { assunto: "Introdução à Filosofia", volume: 1, frente: 1, pinicial: 6, pfinal: 9, prop: 14, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "A Filosofia ao longo da História", volume: 1, frente: 1, pinicial: 10, pfinal: 12, prop: 14, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "O nascimento da Filosofia", volume: 1, frente: 1, pinicial: 18, pfinal: 21, prop: 23, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Sócrates", volume: 1, frente: 1, pinicial: 28, pfinal: 31, prop: 33, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Platão", volume: 1, frente: 1, pinicial: 38, pfinal: 38, prop: 44, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Platão - A República e o Timeu", volume: 1, frente: 1, pinicial: 39, pfinal: 42, prop: 44, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Aristóteles", volume: 1, frente: 1, pinicial: 50, pfinal: 54, prop: 57, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Helenística - O período helenístico e epicurismo", volume: 1, frente: 1, pinicial: 62, pfinal: 62, prop: 67, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Helenística - Estoicismo e Ceticismo", volume: 1, frente: 1, pinicial: 63, pfinal: 64, prop: 67, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Medieval - Patrística e Agostinho", volume: 1, frente: 1, pinicial: 72, pfinal: 73, prop: 80, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Medieval - Escolástica", volume: 1, frente: 1, pinicial: 74, pfinal: 75, prop: 80, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Medieval - Tomás de Aquino", volume: 1, frente: 1, pinicial: 75, pfinal: 77, prop: 80, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia do Renascimento - Humanismo", volume: 1, frente: 1, pinicial: 86, pfinal: 87, prop: 95, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia do Renascimento - Maquiavel", volume: 1, frente: 1, pinicial: 88, pfinal: 89, prop: 95, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia do Renascimento - Rev. Científica", volume: 1, frente: 1, pinicial: 90, pfinal: 92, prop: 95, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Moderna - Racionalismo", volume: 1, frente: 1, pinicial: 102, pfinal: 105, prop: 114, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Moderna - Empirismo", volume: 1, frente: 1, pinicial: 106, pfinal: 109, prop: 114, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Moderna - Criticismo", volume: 1, frente: 1, pinicial: 109, pfinal: 112, prop: 114, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Moderna - Utilitarismo", volume: 1, frente: 1, pinicial: 120, pfinal: 121, prop: 129, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Moderna - Ética deontológica", volume: 1, frente: 1, pinicial: 122, pfinal: 123, prop: 129, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Moderna - Contratualismo", volume: 1, frente: 1, pinicial: 124, pfinal: 127, prop: 129, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Contemporânea - Hegel", volume: 1, frente: 1, pinicial: 138, pfinal: 139, prop: 148, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Contemporânea - Marx e Schopenhauer", volume: 1, frente: 1, pinicial: 140, pfinal: 141, prop: 148, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Contemporânea - Kierkegaard e Nietzsche", volume: 1, frente: 1, pinicial: 142, pfinal: 153, prop: 148, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false },
                { assunto: "Filosofia Contemporânea - IA", volume: 1, frente: 1, pinicial: 196, pfinal: 198, prop: 201, stars: 0, difficult: 0, revisoes: 0, rev1: null, rev1details: {}, concluido: false }
              ]
            }*/
        ]);

        /*await Cronograma.create({
            segunda: ["Biologia", "Química", "História"],
            terça: ["Geografia, Português", "Física"],
            quarta: ["Filosofia", "Biologia", "Matemática"],
            quinta: ["Física, Sociologia, Redação"],
            sexta: ["Português", "Matemática", "Geografia"],
            sábado: ["Química", "História", "Biologia"]
        });*/

        console.log('✅ Dados populados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao popular dados:', error);
    } finally {
        await mongoose.connection.close();
        console.log('🔌 Conexão encerrada');
    }
}

populateDatabase();