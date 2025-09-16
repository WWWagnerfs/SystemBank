import mongoose from 'mongoose';
import validateCPF from '../utils/cpfValidator.js';
import validateEmail from '../utils/emailValidator.js';
import generateId from '../utils/idGenerator.js';

const customerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => generateId('cus')
  },
  name: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validateCPF(v);
      },
      message: 'CPF inválido'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return validateEmail(v);
      },
      message: 'Email inválido'
    }
  },
  accounts: [{
    type: String,
    ref: 'Account',
  }],
}, { _id: false });

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;
