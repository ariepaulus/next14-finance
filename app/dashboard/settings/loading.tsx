import { Skeleton } from '@/components/ui/Skeleton';

export default function SettingsLoading() {
  return (
    <div className='grid grid-cols-1 gap-4'>
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12' />
      <Skeleton className='h-12 md:col-span-2' />
    </div>
  );
}
