import mongoose from 'mongoose';
import generateId from '../utils/idGenerator.js';

const transactionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => generateId('txn')
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['credit', 'debit'],
    required: true,
  },
  category: {
    type: String,
  },
}, { _id: false });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
