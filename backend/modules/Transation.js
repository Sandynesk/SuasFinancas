// models/Transaction.js

const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // Ajuste o caminho conforme necessário

// Define o modelo de transação
const Transaction = sequelize.define('Transaction', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('income', 'expense'), // 'income' para ganhos, 'expense' para despesas
    allowNull: false
  }
});

// Sincroniza o modelo com o banco de dados (opcional)
Transaction.sync();

module.exports = Transaction;
