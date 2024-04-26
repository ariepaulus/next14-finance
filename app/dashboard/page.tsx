import TransactionList from '@/app/dashboard/components/TransactionList';
import { Suspense } from 'react';
import TransactionListFallback from './components/TransactionListFallback';
import Trend from './components/Trend';
import TrendFallback from './components/TrendFallback';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TTransactions } from '@/types/types';
import Range from './components/Range';
import { DateRange } from '../../enums/enums';

interface SearchParams {
  range?: DateRange;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const types: TTransactions[] = [
    'Income',
    'Expenses',
    'Investment',
    'Savings',
  ];

  const range = searchParams?.range ?? DateRange.last30days;

  return (
    <>
      <section className='mb-8 flex justify-between items-center'>
        <h1 className='text-4xl font-semibold'>Summary</h1>
        <aside>
          <Range />
        </aside>
      </section>
      <section className='mb-8 grid grid-cols-2 lg:grid-cols-4 gap-8'>
        {types.map((type, index) => (
          <Suspense key={index} fallback={<TrendFallback />}>
            <Trend type={type} range={range} />
          </Suspense>
        ))}
      </section>
      <section className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl'>Transactions</h2>
        <Button variant='outline'>
          <Link
            href='/dashboard/transaction/add'
            className={`flex items-center space-x-1`}
          >
            <PlusCircle className='w-6 h-6' />
            <div className='text-xl'>Add</div>
          </Link>
        </Button>
      </section>
      <Suspense fallback={<TransactionListFallback />}>
        <TransactionList />
      </Suspense>
    </>
  );
}
