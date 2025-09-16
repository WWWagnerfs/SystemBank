import Account from '../models/Account.js';
import Customer from '../models/Customer.js';

export const createAccount = async (customerId, accountData) => {
  const customer = await Customer.findById(customerId);
  if (!customer) {
    throw new Error('Cliente não encontrado.');
  }

  const accountNumber = Math.floor(10000 + Math.random() * 90000).toString() + '-0';
  const account = new Account({
    type: accountData.type || 'checking',
    number: accountNumber,
  });

  await account.save();
  customer.accounts.push(account._id);
  await customer.save();

  return account;
};

export const getAccountById = async (accountId) => {
  return await Account.findById(accountId);
};

export const getAccountBalance = async (accountId) => {
  const account = await Account.findById(accountId);
  if (!account) {
    throw new Error('Conta não encontrada.');
  }
  return account.balance;
};
