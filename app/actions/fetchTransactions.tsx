import { DateRange } from '@/enums/enums';
import { createClient } from '@/lib/supabase/server';

interface fetchTransactionsProps {
  range: DateRange;
  offset: number;
  limit: number;
}

export default async function fetchTransactions({
  range,
  offset = 0,
  limit = 10,
}: fetchTransactionsProps) {
  const supabase = createClient();
  let { data, error } = await supabase.rpc('fetch_transactions', {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });
  if (error) throw new Error('Cannot fetch transactions');

  return data;
}
