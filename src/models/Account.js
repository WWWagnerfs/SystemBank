import mongoose from 'mongoose';
import generateId from '../utils/idGenerator.js';

const accountSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => generateId('acc')
  },
  type: {
    type: String,
    enum: ['checking', 'savings'],
    default: 'savings',
  },
  branch: {
    type: String,
    required: true,
    default: '0001',
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 1000.0,
  },
  transactions: [{
    type: String,
    ref: 'Transaction',
  }],
}, { _id: false });

const Account = mongoose.model('Account', accountSchema);
export default Account;
