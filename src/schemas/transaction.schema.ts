import { object, string, number, TypeOf, optional } from 'zod';
import { TransactionType } from '../entities/transaction.entity';

export const transactionFormSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    description: string({
      required_error: 'Description is required',
    }),
    amount: number({
      required_error: 'Amount is required',
    }),
    type: string({
      required_error: 'Type is required',
    }).refine((data) => {
      return Object.values(TransactionType).includes(data as any);
    }),
  }),
});

export const getTransactionsSchema = object({
  query: object({
    page: optional(string()),
    limit: optional(string()),
    type: optional(string()),
    q: optional(string()),
  }),
});
      


export type TransactionInput = TypeOf<typeof transactionFormSchema>['body'];
export type GetTransactionsParams = TypeOf<typeof getTransactionsSchema>['query'];
    