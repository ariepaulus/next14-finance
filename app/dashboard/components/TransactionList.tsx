'use client';

import { Separator } from '@/components/ui/Separator';
import TransactionItem from '@/components/TransactionItem';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { ITransactionItem } from '@/types/types';
import { groupAndSumTransactionsByDate } from '@/lib/utils/GroupAndSumTransactionsByDate';

interface TransactionListProps {
  initialTransactions: ITransactionItem[];

}

export default function TransactionList({ initialTransactions }: TransactionListProps) {
  const grouped = groupAndSumTransactionsByDate(
    initialTransactions as ITransactionItem[]
  );

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
