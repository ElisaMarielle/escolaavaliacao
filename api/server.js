require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const aulaRoutes = require('./src/routes/aula.routes');

app.use('/aula', aulaRoutes);


const turmaRoutes = require('./src/routes/turma.routes');

app.use('/turma', turmaRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
