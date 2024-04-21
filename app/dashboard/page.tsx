import TransactionList from '@/app/dashboard/components/TransactionList';
import { Suspense } from 'react';
import TransactionListFallback from './components/TransactionListFallback';
import Trend from './components/Trend';

export default function Dashboard() {
  return (
    <section className='mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8'>
      <Suspense>
        <Trend type='Income' />
      </Suspense>
      <Suspense>
        <Trend type='Expenses' />
      </Suspense>
      <Suspense>
        <Trend type='Investment' />
      </Suspense>
      <Suspense>
        <Trend type='Savings' />
      </Suspense>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </section>
  );
}
