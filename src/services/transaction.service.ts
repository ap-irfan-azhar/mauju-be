import { Transaction } from '../entities/transaction.entity';
import { DeepPartial } from 'typeorm';
import { TransactionInput, GetTransactionsParams } from '../schemas/transaction.schema';
import { AppDataSource } from '../utils/data-source';
import { User } from '../entities/user.entity';

const transactionRepository = AppDataSource.getRepository(Transaction);

export const createTransaction = async (input: DeepPartial<Transaction>, user: User) => {
  const transaction = {
    ...input,
    user: user,
  };
  return transactionRepository.save(transaction);
}

export const findTransactionById = async (transactionId: string, currentUser: User) => {
  const transaction = await transactionRepository
    .createQueryBuilder('transaction')
    .leftJoin('transaction.user', 'user')
    .where('transaction.id = :transactionId', { transactionId })
    .andWhere('transaction.user = :userId', { userId: currentUser.id })
    .getOne();

  return transaction;
}

export const findTransactions = async (params: GetTransactionsParams, user: User ) => {
  const page = params.page ? parseInt(params.page) : 1;
  const limit = params.limit ? parseInt(params.limit) : 10;
  const type = params.type;
  const q = params.q;
  const where: any = {};
  if (type) where.type = type;
  if (q) where.name = { $regex: q, $options: 'i' };
  where.user = user;
  

  const transactions = await transactionRepository
    .createQueryBuilder('transaction')
    .where(where)
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    transactions: transactions[0],
    meta: {
      total_items: transactions[1],
      total_pages: Math.ceil(transactions[1] / limit),
      page,
      limit,
    },
  }  
} 

export const updateTransactionById = async (id: string, input: DeepPartial<Transaction>, currentUser: User) => {
  const transaction = await findTransactionById(id, currentUser);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transactionRepository.update({ id }, input);
}

export const deleteTransactionById = async (transactionId: string, currentUser: User) => {
  console.log(transactionId)
  const transaction = await findTransactionById(transactionId, currentUser);
  if (!transaction) {
    throw new Error('Transaction not found');
  }

  return transactionRepository.delete({ id: transactionId });
}