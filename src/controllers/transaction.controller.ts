import { NextFunction, Request, Response } from 'express';
import {
  createTransaction,
  findTransactionById,
  findTransactions,
  updateTransactionById,
  deleteTransactionById
} from '../services/transaction.service'
import { TransactionInput, GetTransactionsParams } from '../schemas/transaction.schema';
import AppError from '../utils/appError';
import { validate } from 'uuid';

export const getTransactionsHandler = async (
  req: Request<GetTransactionsParams>,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = res.locals.user;

    const transactions = await findTransactions(req.query, currentUser);

    res.status(200).json({
      status: 'success',
      data: transactions,
    });
  } catch (err: any) {
    next(err);
  }
};

export const getTransactionHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {  
  try {
    const currentUser = res.locals.user;

    const transaction = await findTransactionById(req.params.id, currentUser);

    if (!transaction) {
      return next(new AppError(404, 'Transaction not found'));
    }


    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createTransactionHandler = async (
  req: Request<{}, {}, TransactionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser= res.locals.user;
    const body = req.body;

    // @ts-ignore
    const transaction = await createTransaction(body, currentUser);

    res.status(201).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateTransactionByIdHandler = async (
  req: Request<{ id: string }, {}, TransactionInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = res.locals.user;
    const body = req.body;
    const id = req.params.id;

    // @ts-ignore
    const transaction = await updateTransactionById(id, body, currentUser);

    if (!transaction) {
      return next(new AppError(404, 'Transaction not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteTransactionByIdHandler = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const currentUser = res.locals.user;
    const id = req.params.id;

    console.log("id" + req)

    // @ts-ignore
    const transaction = await deleteTransactionById(id, currentUser);

    if (!transaction) {
      return next(new AppError(404, 'Transaction not found'));
    }

    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (err: any) {
    next(err);
  }
};