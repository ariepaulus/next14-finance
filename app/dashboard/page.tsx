import TransactionList from '@/app/dashboard/components/TransactionList';
import { Suspense } from 'react';
import TransactionListFallback from './components/TransactionListFallback';

export default function Dashboard() {
  return (
    <section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </section>
  );
}
