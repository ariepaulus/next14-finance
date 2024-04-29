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
  id: string;
  type: TTransactions;
  category: TCategories;
  description: string;
  amount: number;
  created_at: string;
}

// Extended interface for client-side use that includes the function
export interface IClientTransactionItem extends ITransactionItem {
  onRemoved: (id: string) => () => void;
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

interface SupabaseUser {
  id: string; // '701bd907-9c48-4a33-9751-14a94e16a373';
  aud: string; // 'authenticated';
  role: string; // 'authenticated';
  email: string; // 'averburgh@gmail.com';
  email_confirmed_at: string; // '2024-04-27T22:09:14.920119Z';
  phone: string; // ''
  confirmation_sent_at: string; // '2024-04-27T22:08:44.993516Z';
  confirmed_at: string; // '2024-04-27T22:09:14.920119Z';
  recovery_sent_at: string; // '2024-04-28T18:39:10.755634Z';
  last_sign_in_at: string; // '2024-04-28T18:39:25.642334Z';
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: [Array];
  created_at: string; // '2024-04-27T21:33:25.042438Z';
  updated_at: string; // '2024-04-29T03:47:07.125546Z';
  is_anonymous: boolean; // false;
}

type UserMetadata = {
  defaultView?: DateRange[];
  email: string;
  email_verified: boolean;
  fullName?: string;
  phone_verified: boolean;
  sub: string;
  avatar: string;
  avatar_url: string;
};

type AppMetadata = {
  provider: string; // 'email';
  providers: string[]; // ['email'];
};

export interface User {
  id: string;
  aud: string;
  role: string | undefined;
  email: string;
  email_confirmed_at: string;
  phone?: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  recovery_sent_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Array<any>;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

export interface SupabaseResponse {
  data: {
    user: User;
  };
  error: any;
}