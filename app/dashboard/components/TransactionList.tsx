'use client';

import { Separator } from '@/components/ui/Separator';
import TransactionItem from '@/components/TransactionItem';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { ITransactionItem } from '@/types/types';
import { groupAndSumTransactionsByDate } from '@/lib/utils/GroupAndSumTransactionsByDate';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { MouseEvent } from 'react';
import fetchTransactions from '@/app/actions/fetchTransactions';
import { DateRange } from '@/enums/enums';

interface TransactionListProps {
  range: DateRange;
  initialTransactions: ITransactionItem[];
}

export default function TransactionList({
  range,
  initialTransactions,
}: TransactionListProps) {
  const [transactions, setTransactions] = useState(
    initialTransactions as ITransactionItem[]
  );
  const [offset, setOffset] = useState(initialTransactions.length);

  const grouped = groupAndSumTransactionsByDate(
    transactions as ITransactionItem[]
  );

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const nextTransactions = await fetchTransactions({
      range,
      offset,
      limit: 10,
    });
    setOffset(prevOffset => prevOffset + 10);
    setTransactions(prevTransactions => [
      ...prevTransactions,
      ...nextTransactions,
    ]);
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
                <TransactionItem {...transaction} />
              </div>
            ))}
          </section>
        </div>
      ))}
      <div className='flex justify-center'>
        <Button variant='outline' onClick={handleClick}>
          Load More
        </Button>
      </div>
    </div>
  );
}
