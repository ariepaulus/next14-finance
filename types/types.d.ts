export type TTransactions = 'Income' | 'Expenses' | 'Investment' | 'Savings';

export type TIncome = 'Salary' | 'Investment' | 'Other';

export type TExpenses =
  | 'Groceries'
  | 'Transport'
  | 'Housing'
  | 'Entertainment'
  | 'Restaurant'
  | 'Health'
  | 'Education'
  | 'Utilities'
  | 'Other';

export type TInvestments = 'Stocks' | 'Bonds' | 'Property' | 'Other';

export type TSavings = 'Emergency' | 'Retirement' | 'Other';

export type TCategories =
  | TIncome
  | TExpenses
  | TInvestments
  | TSavings;

export interface ITransactionItem {
  id?: number;
  type: TTransactions;
  category?: TCategories;
  description: string;
  amount: number;
}