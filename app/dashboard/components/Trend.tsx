import BaseTrend from '@/components/Trend';
import { createClient } from '@/lib/supabase/server';
import { TTransactions } from '@/types/types';
import { PostgrestError } from '@supabase/supabase-js';
import { DateRange } from '../../../enums/enums';

interface TrendProps {
  type: TTransactions;
  range: DateRange;
}

export default async function Trend({ type, range }: TrendProps) {
  try {
    const supabase = createClient();
    let { data, error } = await supabase.rpc('calculate_total', {
      range_arg: range,
      type_arg: type,
    });
    if (error) throw error;

    if (!data || data.length === 0) {
      console.error('No trend data found for type:', type);
      return <div>No data found for {type}</div>;
    }

    const amounts = data[0];
    console.log('Amounts:', amounts);

    return (
      <BaseTrend
        type={type}
        amount={amounts.current_amount}
        prevAmount={amounts.previous_mount}
      />
    );
  } catch (error) {
    const e = error as PostgrestError;
    console.error('Error fetching transaction trend data:', e.message);
    return (
      <div className='text-red-500'>
        Fetching {type.toLowerCase()} trend data failed: {e.message}
      </div>
    );
  }
}
