import express from 'express';
import cors from 'cors';
import connectDB from './db_connect.js';
import path from 'path';
import mongoose from 'mongoose';
import { Subject, Cronograma } from './models/subject.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Conectar uma única vez ao MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Resolver caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rota para buscar dados
app.get('/data', async (req, res) => {
    try {
        const data = await mongoose.connection.db.collection('subjects').find().toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar dados');
    }
});

// Rota para buscar cronograma
app.get('/cronograma', async (req, res) => {
    try {
        const cronograma = await Cronograma.findOne(); // Usando o modelo Mongoose

        if (!cronograma) {
            return res.status(404).send('Cronograma não encontrado');
        }

        res.json(cronograma);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar cronogramass');
    }
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, '../interface')));

app.post('/update-topic', async (req, res) => {
    try {
        const { assunto, topicId, updates } = req.body;
        const subject = await Subject.findOne({ "topics._id": topicId });

        if (!subject) {
            return res.status(404).send('Disciplina ou tópico não encontrado');
        }

        const topic = subject.topics.id(topicId); 
        if (!topic) {
            return res.status(404).send('Tópico não encontrado');
        }

        // Atualizar os campos do tópico
        topic.concluido = updates.concluido || topic.concluido; 
        topic.difficult = updates.difficult || topic.difficult; 
        topic.rate = updates.rate || topic.rate; 
        topic.view = new Date() || topic.view


        await subject.save();

        res.status(200).send('Tópico atualizado com sucesso');
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao atualizar tópico');
    }
});

// Rota padrão para 404
app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando em http://127.0.0.1:${PORT}`);
});
