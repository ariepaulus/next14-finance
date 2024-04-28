'use client';

import { Separator } from '@/components/ui/Separator';
import TransactionItem from '@/components/TransactionItem';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { IClientTransactionItem } from '@/types/types';
import { groupAndSumTransactionsByDate } from '@/lib/utils/GroupAndSumTransactionsByDate';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import fetchTransactions from '@/app/actions/fetchTransactions';
import { DateRange } from '@/enums/enums';
import { Loader } from 'lucide-react';

interface TransactionListProps {
  range: DateRange;
  initialTransactions: IClientTransactionItem[];
}

export default function TransactionList({
  range,
  initialTransactions,
}: TransactionListProps) {
  const [transactions, setTransactions] = useState(
    initialTransactions as IClientTransactionItem[]
  );
  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = useState(false);

  const grouped = groupAndSumTransactionsByDate(
    transactions as IClientTransactionItem[]
  );

  const handleClick = async () => {
    setLoading(true);
    let nextTransactions: IClientTransactionItem[] = [];
    try {
      nextTransactions = await fetchTransactions({
        range,
        offset: transactions.length,
        limit: 10,
      });
      setButtonHidden(nextTransactions.length === 0);
      setTransactions(prevTransactions => [
        ...prevTransactions,
        ...nextTransactions,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoved = (id: string) => () => {
    setTransactions(prevTransactions => {
      return prevTransactions.filter(transaction => transaction.id !== id);
    });
  };

  return (
    <div className='space-y-8'>
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <Separator />
          <section className='space-y-4'>
            {transactions.map(transaction => (
              <div key={transaction.id}>
                <TransactionItem {...transaction} onRemoved={handleRemoved} />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className='text-center text-gray-400 dark:text-gray-500'>
          No further transactions found!
        </div>
      )}
      {!buttonHidden && (
        <div className='flex justify-center'>
          <Button variant='outline' onClick={handleClick} disabled={loading}>
            <div className='flex items-center space-x-1'>
              {loading && <Loader size={16} className='animate-spin' />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
