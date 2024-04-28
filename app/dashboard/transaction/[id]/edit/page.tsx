import TransactionForm from '@/app/dashboard/components/TransactionForm';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Transaction',
};

interface IParams {
  params: {
    id: string;
  };
}

export default async function EditTransactionPage({ params: { id } }: IParams) {
  const supabase = createClient();
  const { data: transaction, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .single();

  if (error) notFound();

  return (
    <>
      <h1 className='text-4xl font-semibold mb-8'>Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
}
