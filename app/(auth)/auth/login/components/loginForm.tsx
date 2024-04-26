'use client';

import Input from '@/components/ui/Input';
import SubmitButton from '@/components/SubmitButton';
import { login } from '@/app/actions/login';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className='space-y-2'>
      <Input
        type='email'
        placeholder='name@example.com'
        name='email'
        required
      />
      <SubmitButton type='submit' size='sm' className='w-full'>
        Sign in with email
      </SubmitButton>
      <p
        className={`${
          state?.error ? 'text-red-500' : 'text-green-500'
        } text-sm text-center`}
      >
        {state?.message}
      </p>
    </form>
  );
}
