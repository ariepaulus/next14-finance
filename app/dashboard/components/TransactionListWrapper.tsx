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

  // The key prop is used to force the component to re-render when the range changes
  // This means you don't have to use useEffect to fetch the transactions when the range changes
  return (
    <TransactionList
      initialTransactions={transactions}
      key={range}
      range={range}
    />
  );
}
