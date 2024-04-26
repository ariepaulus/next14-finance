'use client';

import { Separator } from '@/components/ui/Separator';
import TransactionItem from '@/components/TransactionItem';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { ITransactionItem } from '@/types/types';
import { fetchTransactions } from '@/lib/utils/server-utils';
import { useEffect, useState } from 'react';
import { groupAndSumTransactionsByDate } from '@/lib/utils/GroupAndSumTransactionsByDate';

export default function TransactionList() {
  const [transactions, setTransactions] = useState<ITransactionItem[]>([]);

  useEffect(() => {
    fetchTransactions().then(transactions => {
      setTransactions(transactions);
    });
  }, []);

  // console.log('transactions =>', transactions);
  const grouped = groupAndSumTransactionsByDate(
    transactions as ITransactionItem[]
  );
  // console.log('grouped =>', grouped);

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
    </div>
  );
}
