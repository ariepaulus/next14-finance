import { Metadata } from 'next';
import TransactionForm from '../../components/TransactionForm';

export const metadata: Metadata = {
  title: 'Add Transaction',
};

export default function AddTransactionPage() {
  return (
    <>
      <h1 className='text-4xl font-semibold mb-8'>Add Transaction</h1>
      <TransactionForm initialData={null} />
    </>
  );
}
