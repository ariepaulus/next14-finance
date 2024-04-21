import { useMemo } from 'react';
import { Triangle, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { useFormatCurrency as FormatCurrency } from '@/hooks/use-format-currency';
import { TTrends } from '@/types/types';



export default function Trend({ type, amount, prevAmount }: TTrends) {
  const colorClasses = {
    Income: 'text-green-700 dark:text-green-300',
    Expenses: 'text-red-700 dark:text-red-300',
    Investment: 'text-indigo-700 dark:text-indigo-300',
    Savings: 'text-yellow-700 dark:text-yellow-300',
  };

  const calcPercentageChange = (amount: number, prevAmount: number) => {
    return prevAmount === 0 ? 0 : ((amount - prevAmount) / prevAmount) * 100;
  };

  const percentageChange = useMemo(
    () =>
      prevAmount
        ? parseInt(calcPercentageChange(amount, prevAmount).toFixed(0))
        : 0,
    [amount, prevAmount]
  );

  return (
    <div>
      <div className={`font-semibold ${colorClasses[type]}`}>{type}</div>
      <div className='text-2xl font-semibold text-black dark:text-white mb-2'>
        {amount ? FormatCurrency(amount) : FormatCurrency(0)}
      </div>
      <div className='flex space-x-1 items-center text-sm'>
        <Triangle />
        {percentageChange}%
        {/* If percentage change is greater than zero, show 'ArrowUp'; if percentage change less than zero, show 'ArrowDown'; otherwise show 'ArrowRight' */}
        {percentageChange > 0 && (
          <ArrowUp className='text-green-700 dark:text-green-300' />
        )}
        {percentageChange < 0 && (
          <ArrowDown className='text-red-700 dark:text-red-300' />
        )}
        {percentageChange === 0 && <ArrowRight />}
      </div>
    </div>
  );
}
