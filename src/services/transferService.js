import Account from '../models/Account.js';
import Transaction from '../models/Transaction.js';

export const transferBetweenAccounts = async (transferData) => {
  const { fromAccountId, toAccountId, amount, description } = transferData;

  if (fromAccountId === toAccountId) {
    throw new Error('Não é possível transferir para a mesma conta.');
  }

  const fromAccount = await Account.findById(fromAccountId);
  const toAccount = await Account.findById(toAccountId);

  if (!fromAccount || !toAccount) {
    throw new Error('Uma das contas não foi encontrada.');
  }

  if (fromAccount.balance < amount) {
    throw new Error('Saldo insuficiente para realizar a transferência.');
  }

  fromAccount.balance -= amount;
  const debitTransaction = new Transaction({
    description: description || `Transferência para conta ${toAccount.number}`,
    amount,
    type: 'debit',
    category: 'Transferência'
  });
  await debitTransaction.save();
  fromAccount.transactions.push(debitTransaction._id);

  toAccount.balance += amount;
  const creditTransaction = new Transaction({
    description: description || `Transferência da conta ${fromAccount.number}`,
    amount,
    type: 'credit',
    category: 'Transferência'
  });
  await creditTransaction.save();
  toAccount.transactions.push(creditTransaction._id);

  await fromAccount.save();
  await toAccount.save();

  return {
    fromAccount: {
      _id: fromAccount._id,
      number: fromAccount.number,
      newBalance: fromAccount.balance
    },
    toAccount: {
      _id: toAccount._id,
      number: toAccount.number,
      newBalance: toAccount.balance
    },
    amount,
    timestamp: new Date()
  };
};
