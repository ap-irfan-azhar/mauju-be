import express from 'express';
import {
  getTransactionsHandler,
  getTransactionHandler,
  createTransactionHandler,
  updateTransactionByIdHandler,
  deleteTransactionByIdHandler,
} from '../controllers/transaction.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { transactionFormSchema } from '../schemas/transaction.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/', getTransactionsHandler);

router.get('/:id', getTransactionHandler);

router.post('/', validate(transactionFormSchema), createTransactionHandler);

router.put('/:id', validate(transactionFormSchema), updateTransactionByIdHandler);

router.delete('/:id', deleteTransactionByIdHandler);

export default router;