import React, { useState, useEffect } from 'react';
import '../components/CSS/F.css';

const F = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', type: 'income' });

  // Fetch as transações do backend
  useEffect(() => {
    fetch('http://localhost:3001/api/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data))
      .catch(error => console.error('Erro ao buscar transações:', error));
  }, []);

  // Adicionar nova transação
  const addTransaction = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    })
    .then(response => response.json())
    .then(data => {
      setTransactions([...transactions, data]);
      setNewTransaction({ description: '', amount: '', type: 'income' });
    })
    .catch(error => console.error('Erro ao adicionar transação:', error));
  };

  // Remover transação
  const deleteTransaction = (id) => {
    fetch(`http://localhost:3001/api/transactions/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    })
    .catch(error => console.error('Erro ao remover transação:', error));
  };

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'income')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const totalExpense = transactions
    .filter(transaction => transaction.type === 'expense')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const balance = totalIncome - totalExpense;

  return (
    <div className="finance-tracker">
      <h1 className="tracker-title">Controle de Finanças</h1>

      <div className="balance-info">
        <p>Saldo: <span>R${balance.toFixed(2)}</span></p>
        <p>Ganhos: <span className="income">R${totalIncome.toFixed(2)}</span></p>
        <p>Gastos: <span className="expense">R${totalExpense.toFixed(2)}</span></p>
      </div>

      <form className="transaction-form" onSubmit={addTransaction}>
        <input 
          type="text" 
          placeholder="Descrição" 
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          required 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
          required 
        />
        <select 
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
        >
          <option value="income">Ganhos</option>
          <option value="expense">Gastos</option>
        </select>
        <button type="submit" className="add-transaction">Adicionar</button>
      </form>

      <ul className="transaction-list">
        {transactions.length > 0 ? (
          transactions.map((transaction, index) => (
            <li key={transaction.id} className={transaction.type}>
              <span>{transaction.description}</span>
              <span>R${parseFloat(transaction.amount).toFixed(2)}</span>
              <button onClick={() => deleteTransaction(transaction.id)}>Remover</button>
            </li>
          ))
        ) : (
          <p className="no-transactions">Nenhuma transação registrada</p>
        )}
      </ul>
    </div>
  );
};

export default F;
    