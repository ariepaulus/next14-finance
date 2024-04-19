import PageHeader from '@/components/PageHeader';
import TransactionItem from '@/components/TransactionItem';
import Trend from '@/components/Trend';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { Button } from '@/components/ui/Button';

export default function Page() {
  return (
    <main className='space-y-8 mb-44 ml-44 mr-44'>
      <h1 className='text-4xl mt-8'>Playground</h1>
      <div>
        <h2 className='mb-4 text-lg font-mono'>PageHeader</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div>
          <PageHeader className={''} />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Trend</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div className='flex space-x-8'>
          <Trend type='Income' amount={10_000} prevAmount={9000} />
          <Trend type='Expenses' amount={8_000} prevAmount={12_000} />
          <Trend type='Investment' amount={7000} prevAmount={7000} />
          <Trend type='Savings' amount={500} prevAmount={100} />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Transaction Items</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div className='space-y-4'>
          <TransactionItem
            type='Income'
            category='Salary'
            description='Government Salary'
            amount={20_000}
          />
          <TransactionItem
            type='Expenses'
            category='Housing'
            description='Mortgage Premium'
            amount={8000}
          />
          <TransactionItem
            type='Savings'
            category='Retirement'
            description='Pension Fund'
            amount={3000}
          />
          <TransactionItem
            type='Investment'
            category='Property'
            description='Rental Income'
            amount={10_000}
          />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>
          Transactions Summary and Transaction Items for a Specific Date
        </h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div className='space-y-4'>
          <TransactionSummaryItem date='2024-04-01' amount={3500} />
          <hr className='mb-4 border-gray-200 dark:border-gray-800' />
          <TransactionItem
            type='Income'
            category='Salary'
            description='Government Salary'
            amount={20_000}
          />
          <TransactionItem
            type='Expenses'
            category='Housing'
            description='Mortgage Premium'
            amount={8000}
          />
          <TransactionItem
            type='Savings'
            category='Retirement'
            description='Pension Fund'
            amount={3000}
          />
          <TransactionItem
            type='Investment'
            category='Property'
            description='Rental Income'
            amount={10_000}
          />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Buttons</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div className='space-x-4'>
          {' '}
          <Button variant='default'>Default</Button>
          <Button variant='outline'>Outline</Button>
          <Button variant='ghost'>Ghost</Button>
          <Button variant='destructive'>Destructive</Button>
          <Button variant='secondary'>Secondary</Button>
          <Button variant='link'>Link</Button>
          <Button size='lg'>Large</Button>
          <Button size='default'>Default</Button>
          <Button size='sm'>Small</Button>
          <Button size='icon'>Icon</Button>
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Forms</h2>
        <hr className='mb-4 border-gray-200 dark:border-gray-800' />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='text-gray-700 dark:text-gray-300 block mb-1'>
              Your name
            </label>
            <input
              type='text'
              placeholder='Type something here!'
              className='w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950'
            />
          </div>
          <div>
            <label className='text-gray-700 dark:text-gray-300 block mb-1'>
              City
            </label>
            <select className='w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950'>
              <option value=''>Select a city</option>
              <option value='lagos'>Lagos</option>
              <option value='abuja'>Abuja</option>
              <option value='kano'>Kano</option>
              <option value='ibadan'>Ibadan</option>
            </select>
          </div>
          <div className='flex items-center'>
            <input
              type='checkbox'
              className='rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm'
            />
            <label className='text-gray-700 dark:text-gray-300 ml-2'>
              City
            </label>
          </div>
        </div>
      </div>
    </main>
  );
}
