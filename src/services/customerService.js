import Customer from '../models/Customer.js';

export const createCustomer = async (customerData) => {
  const { name, cpf, email } = customerData;

  const existingCustomer = await Customer.findOne({ $or: [{ cpf }, { email }] });
  if (existingCustomer) {
    throw new Error('CPF ou email já cadastrado.');
  }

  const customer = new Customer({ name, cpf, email });
  return await customer.save();
};

export const getCustomers = async () => {
  return await Customer.find({}).populate('accounts');
};

export const getCustomerById = async (customerId) => {
  return await Customer.findById(customerId).populate('accounts');
};
