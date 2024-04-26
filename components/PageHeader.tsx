import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { createClient } from '@/lib/supabase/server';
import { sizes, variants } from '@/lib/utils/variants';
import { KeyRound } from 'lucide-react';
import SignOutButton from './SignOutButton';
import Avatar from './Avatar';

export default async function PageHeader({ className }: { className: string }) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <header className={`flex justify-between items-center p-y-4 ${className}`}>
      <Link
        href='/dashboard'
        className='text-xl hover:underline underline-offset-8 decoration-2'
      >
        Finance Tracker
      </Link>
      <div className='flex items-center space-x-4'>
        <ModeToggle />
        {user && (
          <Link
            href='/dashboard/settings'
            className={`flex items-center space-x-1 ${variants.ghost} ${sizes.sm}`}
          >
            <Avatar />
            <span>{user?.user_metadata?.fullName ?? user?.email}</span>
          </Link>
        )}
        {user && <SignOutButton />}
        {!user && (
          <Link href='/login' className={`${variants.ghost} ${sizes.sm}`}>
            <KeyRound className='w-6 h-6' />
          </Link>
        )}
      </div>
    </header>
  );
}
