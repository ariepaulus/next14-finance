import { useFormatCurrency as FormatCurrency } from '@/hooks/use-format-currency';
import {
  IncomeType,
  ExpenseType,
  SavingsType,
  InvestmentType,
  TransactionType,
} from '@/types/types';
import { HandCoins, Wallet, Landmark, PiggyBank, Pencil } from 'lucide-react';

interface TransactionItemProps {
  type: TransactionType;
  category?: ExpenseType | IncomeType | SavingsType | InvestmentType;
  description: string;
  amount: number;
}

export default function TransactionItem({
  type,
  category,
  description,
  amount,
}: TransactionItemProps) {
  const typesMap = {
    Income: {
      icon: HandCoins,
      colors: 'text-green-500 dark:text-green-400',
    },
    Expenses: {
      icon: Wallet,
      colors: 'text-red-500 dark:text-red-400',
    },
    Savings: {
      icon: PiggyBank,
      colors: 'text-indigo-500 dark:text-indigo-400',
    },
    Investment: {
      icon: Landmark,
      colors: 'text-yellow-500 dark:text-yellow-400',
    },
  };
  const IconComponent = typesMap[type].icon;
  const colors = typesMap[type].colors;
  const formattedAmount = FormatCurrency(amount);

  return (
    <div className='w-full flex items-center'>
      <div className='flex items-center mr-4 grow'>
        <IconComponent className={`${colors} mr-2 w-4 h-4 hidden sm:block`} />
        <span className='flex-1 min-w-0'>{description}</span>
      </div>
      <div className='min-w-[150px] items-center hidden md:flex'>
        {category && (
          <div className='rounded-md text-xs bg-gray-700 dark:bg-gray-100 text-gray-100 dark:text-black px-2 py-0.5'>
            {category}
          </div>
        )}
      </div>
      <div className='min-w-[70px] text-right'>{formattedAmount}</div>
      <div className='min-w-[50px] flex justify-end'>...</div>
    </div>
  );
}
