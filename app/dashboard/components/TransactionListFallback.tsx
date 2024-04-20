import { Skeleton } from '@/components/ui/Skeleton';

export default function TransactionListFallback() {
  return (
    <div className='space-y-8'>
      <div className='space-y-4'>
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>

      <div className='space-y-4'>
        <TransactionSummaryItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
        <TransactionItemSkeleton />
      </div>
    </div>
  );
}

function TransactionItemSkeleton() {
  return (
    <div className='w-full flex items-center space-x-4'>
      <div className='flex items-center grow'>
        <Skeleton className='w-[750px] h-[20px] rounded-full' />
      </div>
      <div className='min-w-[150px] items-center hidden md:flex'>
        <Skeleton className='w-[520px] h-[20px] rounded-full' />
      </div>
      <div className='min-w-[70px] text-right'>
        <Skeleton className='w-[100px] h-[20px] rounded-full' />
      </div>
      <div className='min-w-[50px] flex justify-end'>
        <Skeleton className='w-[100px] h-[20px] rounded-full' />
      </div>
    </div>
  );
}

function TransactionSummaryItemSkeleton() {
  return (
    <div className='flex space-x-4'>
      <div className='grow'>
        <Skeleton className='w-[1400px] h-[20px] rounded-full' />
      </div>

      <div className='min-w-[70px]'>
        <Skeleton className='w-[100px] h-[20px] rounded-full' />
      </div>
      <div className='min-w-[50px]'></div>
    </div>
  );
}
