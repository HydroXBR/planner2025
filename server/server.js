import express from 'express';
import cors from 'cors';
import connectDB from './db_connect.js';
import path from 'path';
import mongoose from 'mongoose';
import { Subject, Cronograma } from './models/subject.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
connectDB();

app.use(cors());
app.use(express.json());
function getAdjustedDate(date) {
    let adjustedDate = new Date(date);
    if (adjustedDate.getHours() < 3) {
        adjustedDate.setDate(adjustedDate.getDate() - 1);
    }
    return adjustedDate
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/data', async (req, res) => {
    try {
        const data = await mongoose.connection.db.collection('subjects').find().toArray();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar dados');
    }
});

app.get('/cronograma', async (req, res) => {
    try {
        const cronograma = await Cronograma.findOne();

        if (!cronograma) {
            return res.status(404).send('Cronograma não encontrado');
        }

        res.json(cronograma);
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao buscar cronogramass');
    }
});

app.use(express.static(path.join(__dirname, "../interface")));

app.use("/Poliedro", express.static(path.join(__dirname, "../Poliedro")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../interface/index.html"));
});

app.post('/update-topic', async (req, res) => {
    try {
        const { assunto, topicId, updates } = req.body;
        const subject = await Subject.findOne({ "topics._id": topicId });

        if (!subject) {
            return res.status(404).send({success: false, message: "Disciplina ou tópico não encontrado!"});
        }

        const topic = subject.topics.id(topicId); 
        if (!topic) {
            return res.status(404).send({success: false, message: "Disciplina ou tópico não encontrado!"});
        }

        topic.concluido = updates.concluido || topic.concluido; 
        topic.difficult = updates.difficult || topic.difficult; 
        topic.questoesTotais = updates.questoesTotais || topic.questoesTotais; 
        topic.questoesCorretas = updates.questoesCorretas || topic.questoesCorretas; 
        topic.view = updates.view || new Date()


        await subject.save();

        res.status(200).send({success: true, message: "Tópico atualizado com sucesso."});
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, message: "Erro ao atualizar tópico."});
    }
});

app.post('/add-review', async (req, res) => {
    try {
        const { topicId, review } = req.body;

        if (!topicId || !review) {
            return res.status(400).send('Dados incompletos');
        }

        const subject = await Subject.findOne({ "topics._id": topicId });
        if (!subject) {
            return res.status(404).send({success: false, message: "Disciplina ou tópico não encontrado!"});
        }

        const topic = subject.topics.id(topicId);
        if (!topic) {
            return res.status(404).send({success: false, message: "Disciplina ou tópico não encontrado!"});
        }

        topic.reviews.push(review);
        await subject.save();

        res.status(200).send({success: true, message: "Revisão adicionada com sucesso!"});
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, message: "Erro ao adicionar revisão!"});
    }
});

app.use((req, res) => {
    res.status(404).send('Página não encontrada!');
});

app.listen(PORT, () => {
    console.log(`🔥 Servidor rodando em http://127.0.0.1:${PORT}`);
});