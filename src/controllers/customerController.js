import * as customerService from '../services/customerService.js';

export const createCustomer = async (req, res) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (error) {
    if (error.message === 'CPF ou email já cadastrado.') {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Erro ao criar cliente.", error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await customerService.getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar clientes.", error: error.message });
  }
};
