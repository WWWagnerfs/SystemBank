import * as accountService from '../services/accountService.js';

export const createAccount = async (req, res) => {
  try {
    const { customerId } = req.params;
    const account = await accountService.createAccount(customerId, req.body);
    res.status(201).json(account);
  } catch (error) {
    if (error.message === 'Cliente não encontrado.') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao criar conta.", error: error.message });
  }
};

export const getBalance = async (req, res) => {
  try {
    const { accountId } = req.params;
    const balance = await accountService.getAccountBalance(accountId);
    res.status(200).json({ balance });
  } catch (error) {
    if (error.message === 'Conta não encontrada.') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao consultar saldo.", error: error.message });
  }
};
