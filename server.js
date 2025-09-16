import 'dotenv/config';
import express from 'express';
import connectDB from './src/config/database.js';
import apiRoutes from './src/routes/api.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({
    message: "Bem-vindo à API do SystemBank!",
    status: "online",
    timestamp: new Date()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
