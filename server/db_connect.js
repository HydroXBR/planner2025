import mongoose from 'mongoose';
const {userMongoDB, passwordMongoDB, databaseMongoDB} = process.env

const uri = `mongodb+srv://${userMongoDB}:${passwordMongoDB}@cluster0.w4fuw.mongodb.net/${databaseMongoDB}?retryWrites=true&w=majority`;

let isConnected = false;

export default async function connectDB() {
    if (isConnected) {
        console.log('🟢 Já conectado ao MongoDB');
        return;
    }

    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        isConnected = true;
        console.log('🔥 Conectado ao MongoDB');
    } catch (error) {
        console.error('❌ Erro ao conectar ao MongoDB:', error);
    }
}
