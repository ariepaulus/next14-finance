import PageHeader from '@/components/PageHeader';
import TransactionItem from '@/components/TransactionItem';
import Trend from '@/components/Trend';
import TransactionSummaryItem from '@/components/TransactionSummaryItem';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { Checkbox } from '@/components/ui/Checkbox';
import { Separator } from '@/components/ui/Separator';
import { Skeleton } from '@/components/ui/Skeleton';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Playground',
};

export default function Page() {
  return (
    <main className='space-y-8 mb-44'>
      <h1 className='text-4xl mt-8'>Playground</h1>
      <div>
        <h2 className='mb-4 text-lg font-mono'>PageHeader</h2>
        <Separator />
        <div>
          <PageHeader className={''} />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Trend</h2>
        <Separator />
        <div className='flex space-x-8'>
          <Trend type='Income' amount={20_000} prevAmount={15_000} />
          <Trend type='Expenses' amount={18_000} prevAmount={13_000} />
          <Trend type='Investment' amount={10_000} prevAmount={7000} />
          <Trend type='Savings' amount={60_000} prevAmount={50_000} />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Transaction Items</h2>
        <Separator />
        <div className='space-y-4'>
          <TransactionItem
            type='Income'
            category='Salary/Wages'
            description='Government Salary'
            amount={240_000}
            created_at=''
          />
          <TransactionItem
            type='Expenses'
            category='Housing'
            description='Mortgage Premium'
            amount={18_000}
            created_at=''
          />
          <TransactionItem
            type='Savings'
            category='Retirement'
            description='Pension Fund'
            amount={60_000}
            created_at=''
          />
          <TransactionItem
            type='Investment'
            category='Property'
            description='Rental Income'
            amount={10_000}
            created_at=''
          />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>
          Transactions Summary and Transaction Items for a Specific Month
        </h2>
        <Separator />
        <div className='space-y-4'>
          <TransactionSummaryItem date='2024-04-01' amount={35_833} />
          <Separator />
          <TransactionItem
            type='Income'
            category='Salary/Wages'
            description='Government Salary'
            amount={20_000}
            created_at=''
          />
          <TransactionItem
            type='Expenses'
            category='Housing'
            description='Mortgage Premium'
            amount={833}
            created_at=''
          />
          <TransactionItem
            type='Savings'
            category='Retirement'
            description='Pension Fund'
            amount={5000}
            created_at=''
          />
          <TransactionItem
            type='Investment'
            category='Property'
            description='Rental Income'
            amount={10_000}
            created_at=''
          />
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Buttons</h2>
        <Separator />
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
        <Separator />
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label>Your name</Label>
            <Input type='text' placeholder='Type something here!' />
          </div>
          <div>
            <Label>City</Label>
            <Select defaultValue=''>
              <option value='' disabled>
                Select a city
              </option>
              <option value='warsaw'>Warsaw</option>
              <option value='berlin'>Berlin</option>
              <option value='london'>London</option>
            </Select>
          </div>
          <div className='flex items-center'>
            <Checkbox id='terms' />
            <Label htmlFor='terms'>Accept terms</Label>
          </div>
        </div>
      </div>
      <div>
        <h2 className='mb-4 text-lg font-mono'>Loading Skeleton</h2>
        <Separator />
        <div className='space-y-8'>
          <div className='flex space-x-4'>
            <Skeleton className='w-[500px] h-[20px] rounded-full' />
            <Skeleton className='w-[500px] h-[20px] rounded-full' />
            <Skeleton className='w-[500px] h-[20px] rounded-full' />
          </div>

          <div className='space-y-4'>
            <Skeleton className='w-[1500px] h-[20px] rounded-full' />
            <Skeleton className='w-[1500px] h-[20px] rounded-full' />
            <Skeleton className='w-[1500px] h-[20px] rounded-full' />
          </div>
        </div>
      </div>
    </main>
  );
}
