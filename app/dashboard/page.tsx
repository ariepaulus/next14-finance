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
import TransactionListWrapper from './components/TransactionListWrapper';
import { createClient } from '@/lib/supabase/server';

interface SearchParams {
  range?: DateRange;
}

export default async function DashboardPage({
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
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const defaultView = data?.user?.user_metadata?.defaultView;
  const range = searchParams?.range ?? defaultView ?? DateRange.last30days;

  // console.log('Supabase User => ', await supabase.auth.getUser());

  return (
    <div className='space-y-8'>
      <section className='flex justify-between items-center'>
        <h1 className='text-4xl font-semibold'>Summary</h1>
        <aside>
          <Range defaultValue={defaultView} />
        </aside>
      </section>
      <section className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
        {types.map((type, index) => (
          <Suspense key={index} fallback={<TrendFallback />}>
            <Trend type={type} range={range} />
          </Suspense>
        ))}
      </section>
      <section className='flex justify-between items-center'>
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
        <TransactionListWrapper range={range} />
      </Suspense>
    </div>
  );
}

/* Supabase User =>  {
  data: {
    user: {
      id: '701bd907-9c48-4a33-9751-14a94e16a373',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'averburgh@gmail.com',
      email_confirmed_at: '2024-04-27T22:09:14.920119Z',
      phone: '',
      confirmation_sent_at: '2024-04-27T22:08:44.993516Z',
      confirmed_at: '2024-04-27T22:09:14.920119Z',
      recovery_sent_at: '2024-04-28T18:39:10.755634Z',
      last_sign_in_at: '2024-04-28T18:39:25.642334Z',
      app_metadata: [Object],
      user_metadata: [Object],
      identities: [Array],
      created_at: '2024-04-27T21:33:25.042438Z',
      updated_at: '2024-04-29T18:06:27.18694Z',
      is_anonymous: false
    }
  },
  error: null
}
 */
