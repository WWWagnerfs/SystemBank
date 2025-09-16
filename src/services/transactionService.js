import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

export const createTransaction = async (accountId, transactionData) => {
  const { description, amount, type, category } = transactionData;

  const account = await Account.findById(accountId);
  if (!account) {
    throw new Error('Conta não encontrada.');
  }

  if (type === 'debit') {
    if (account.balance < amount) {
      throw new Error('Saldo insuficiente para realizar o débito.');
    }
    account.balance -= amount;
  } else if (type === 'credit') {
    account.balance += amount;
  } else {
    throw new Error('Tipo de transação inválido. Use "credit" ou "debit".');
  }

  const transaction = new Transaction({
    description,
    amount,
    type,
    category,
    date: new Date()
  });

  await transaction.save();
  account.transactions.push(transaction._id);
  await account.save();

  return transaction;
};

export const getAccountStatement = async (accountId) => {
  const account = await Account.findById(accountId).populate('transactions');
  if (!account) {
    throw new Error('Conta não encontrada.');
  }

  return account.transactions.map(tx => ({
    _id: tx._id,
    date: tx.date.toISOString().split('T')[0],
    description: tx.description,
    amount: tx.amount,
    type: tx.type,
    category: tx.category
  }));
};
