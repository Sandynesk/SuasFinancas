const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./modules/db'); // Importa a conexão com o banco de dados
const transactionRoutes = require('./routes/Transactions'); // Rotas de transação

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/api/transactions', transactionRoutes);

// Sincronizar com o banco de dados
sequelize.sync().then(() => {
  console.log('Conectado ao banco de dados MySQL.');
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}).catch((error) => {
  console.log('Erro ao conectar ao banco de dados:', error);
});
