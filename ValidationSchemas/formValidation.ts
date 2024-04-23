import { z } from 'zod';

// Enum schemas for each category of transactions
const TTransactionsSchema = z.enum([
  'Income',
  'Expenses',
  'Investment',
  'Savings',
]);

const TIncomeSchema = z.enum(['Salary', 'Investment', 'Editing', 'Other']);

const TExpensesSchema = z.enum([
  'Groceries',
  'Transport',
  'Housing',
  'Entertainment',
  'Restaurant',
  'Health',
  'Education',
  'Utilities',
  'Other',
]);

const TInvestmentsSchema = z.enum(['Stocks', 'Bonds', 'Property', 'Other']);

const TSavingsSchema = z.enum(['Emergency', 'Retirement', 'Other']);

// Combined categories schema using Zod union
const TCategoriesSchema = z.union([
  TIncomeSchema,
  TExpensesSchema,
  TInvestmentsSchema,
  TSavingsSchema,
]);

// Form validation schema
export const formValidation = z.object({
  type: TTransactionsSchema.refine(type => type !== undefined, {
    message: 'Type is required',
  }),
  category: TCategoriesSchema.refine(category => category !== undefined, {
    message: 'Category is required',
  }),
  created_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  amount: z.coerce
    .number()
    .positive()
    .refine(number => number > 1, {
      message: 'Amount must be a positive number',
    }),
});

// Alternative date validation using Zod:
// created_at: z.string().regex(
//   /^\d{4}-\d{2}-\d{2}$/,
//   'Date must be in YYYY-MM-DD format'
// );
// Another alternative date validation using Zod:
// created_at: z.string().refine(value => !isNaN(Date.parse(value)));
// Another alternative
//  created_at: z.string().transform(value => {
//     const date = new Date(value);
//     if (isNaN(date.getTime())) {
//       throw new Error('Invalid date');
//     }
//     return date.toISOString();
//   }),
