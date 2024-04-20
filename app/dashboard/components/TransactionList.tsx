import TransactionItem from '@/components/TransactionItem';
import { ITransactionItem } from '@/types/types';

export default async function TransactionList() {
  const response = await fetch('http://localhost:3001/transactions');
  const transactions: ITransactionItem[] = await response.json();

  return (
    <section className='space-y-4'>
      {transactions.map(transaction => (
        <div key={transaction.id} className='space-y-4'>
          <TransactionItem
            type={transaction.type}
            category={transaction.category}
            description={transaction.description}
            amount={transaction.amount}
          />
        </div>
      ))}
    </section>
  );
}
