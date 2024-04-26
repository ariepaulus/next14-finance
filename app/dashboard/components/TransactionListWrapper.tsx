import fetchTransactions from '@/app/actions/fetchTransactions';
import { DateRange } from '@/enums/enums';
import TransactionList from './TransactionList';

interface TransactionListWrapperProps {
  range: DateRange;
}

export default async function TransactionListWrapper({
  range,
}: TransactionListWrapperProps) {
  const transactions = await fetchTransactions({ range, offset: 0, limit: 10 });

  return <TransactionList initialTransactions={transactions} />;
}
