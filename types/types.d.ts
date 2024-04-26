export type TTransactions = 'Income' | 'Expenses' | 'Investment' | 'Savings';

export type TIncome =
  | 'Salary/Wages'
  | 'Pension'
  | 'Investment'
  | 'Editing'
  | 'Rental'
  | 'Social Benefits'
  | 'Other';

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

export type TInvestments =
  | 'Stocks'
  | 'Dividends'
  | 'Interest'
  | 'Property'
  | 'Capital Gains'
  | 'Other';

export type TSavings = 'Emergency' | 'Retirement' | 'Special Purpose' | 'Other';

export type TCategories = TIncome | TExpenses | TInvestments | TSavings;

export interface ITransactionItem {
  id?: number;
  type: TTransactions;
  category: TCategories;
  description: string;
  amount: number;
  created_at: string;
}

export interface TTrends {
  type: TTransactions;
  amount: number;
  prevAmount: number;
}

export type TransactionError = {
  type: string;
  message: string;
};


