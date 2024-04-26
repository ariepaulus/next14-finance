import Alert from './Alert';
import { Ban } from 'lucide-react';
import { ReactNode } from 'react';

interface AlertSuccessProps {
  children: ReactNode;
}

export default function AlertError({ children }: AlertSuccessProps) {
  return (
    <Alert
      icon={<Ban className='text-red-700 dark:text-red-300 w-6 h-6' />}
      title={<span className='text-red-700 dark:text-red-300'>Error</span>}
    >
      <span className='text-red-700 dark:text-red-300'>{children}</span>
    </Alert>
  );
}
