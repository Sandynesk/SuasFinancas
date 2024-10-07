// routes/Transactions.js

const express = require('express');
const Transaction = require('../modules/Transation'); // Importa o modelo de transação
const router = express.Router();

// Cria uma nova transação
router.post('/', async (req, res) => {
  try {
    const { description, amount, type } = req.body;
    const transaction = await Transaction.create({ description, amount, type });
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a transação' });
  }
});

// Obtém todas as transações
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as transações' });
  }
});

// Exclui uma transação pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.destroy({ where: { id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Transação não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a transação' });
  }
});

module.exports = router;
