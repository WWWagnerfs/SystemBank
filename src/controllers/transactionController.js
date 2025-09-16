import * as transactionService from '../services/transactionService.js';
import * as transferService from '../services/transferService.js';

export const createTransaction = async (req, res) => {
  try {
    const { accountId } = req.params;
    const transaction = await transactionService.createTransaction(accountId, req.body);
    res.status(201).json({ message: "Transação realizada com sucesso.", transaction });
  } catch (error) {
    if (error.message === 'Conta não encontrada.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Saldo insuficiente para realizar o débito.') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Tipo de transação inválido. Use "credit" ou "debit".') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao realizar transação.", error: error.message });
  }
};

export const getStatement = async (req, res) => {
  try {
    const { accountId } = req.params;
    const statement = await transactionService.getAccountStatement(accountId);
    res.status(200).json(statement);
  } catch (error) {
    if (error.message === 'Conta não encontrada.') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao buscar extrato.", error: error.message });
  }
};

export const transferBetweenAccounts = async (req, res) => {
  try {
    const result = await transferService.transferBetweenAccounts(req.body);
    res.status(200).json({
      message: "Transferência realizada com sucesso.",
      ...result
    });
  } catch (error) {
    if (error.message === 'Não é possível transferir para a mesma conta.') {
      return res.status(400).json({ message: error.message });
    }
    if (error.message === 'Uma das contas não foi encontrada.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Saldo insuficiente para realizar a transferência.') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao realizar transferência.", error: error.message });
  }
};
