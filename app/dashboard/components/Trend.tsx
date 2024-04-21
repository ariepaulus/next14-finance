import BaseTrend from '@/components/Trend';
import { TTrends, TTransactions } from '@/types/types';

export default async function Trend({ type }: { type: TTransactions }) {
  try {
    const response = await fetch(`http://localhost:3001/trends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const trends: TTrends[] = await response.json();
    const trend = trends.find(trend => trend.type === type);

    if (!trend) {
      console.error('No trend data found for type:', type);
      return <div>No data found for {type}</div>;
    }

    console.log('amount =>', trend.amount);
    console.log('prevAmount =>', trend.prevAmount);
    console.log('type =>', type);

    return <BaseTrend type={type} amount={trend.amount} prevAmount={trend.prevAmount} />;
  } catch (error) {
    console.error('Fetching trend data failed:', error);
    return <div>Error fetching data</div>;
  }
}
