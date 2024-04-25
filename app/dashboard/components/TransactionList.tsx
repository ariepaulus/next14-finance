import { Separator } from '@/components/ui/Separator';
import TransactionItem from '@/components/TransactionItem';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { ITransactionItem } from '@/types/types';
import { createClient } from '@/lib/supabase/server';

const groupAndSumTransactionsByDate = (transactions: ITransactionItem[]) => {
  const grouped: {
    [key: string]: { transactions: ITransactionItem[]; amount: number };
  } = {};

  for (const transaction of transactions) {
    const date = transaction.created_at.split('T')[0];

    if (!grouped[date]) {
      grouped[date] = { transactions: [], amount: 0 };
    }
    grouped[date].transactions.push(transaction);
    const amount =
      transaction.type === 'Expenses'
        ? -transaction.amount
        : transaction.amount;
    grouped[date].amount += amount;
  }

  return grouped;
};

export default async function TransactionList() {
  const supabase = createClient();
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return console.error('Error loading transactions: ', error.message);
  }

  if (!transactions) {
    return null;
  }
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
