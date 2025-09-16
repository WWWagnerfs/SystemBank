import express from 'express';
import {
  createCustomer,
  getCustomers
} from '../controllers/customerController.js';

import {
  createAccount,
  getBalance
} from '../controllers/accountController.js';

import {
  createTransaction,
  getStatement,
  transferBetweenAccounts
} from '../controllers/transactionController.js';

const router = express.Router();

router.post('/customers', createCustomer);
router.get('/customers', getCustomers);

router.post('/customers/:customerId/accounts', createAccount);
router.get('/accounts/:accountId/balance', getBalance);

router.post('/accounts/:accountId/transactions', createTransaction);
router.get('/accounts/:accountId/statement', getStatement);
router.post('/transfer', transferBetweenAccounts);

export default router;
