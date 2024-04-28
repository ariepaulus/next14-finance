'use client';

import { loginWithEmail } from '@/app/actions/loginWithEmail';
import SubmitButton from '@/components/SubmitButton';
import Input from '@/components/ui/Input';
import { useFormState } from 'react-dom';

type State = void | {
  message: string;
  error?: boolean;
};

const initialState = {
  message: '',
  error: false,
};

export default function LoginForm() {
  const [state, formAction] = useFormState(loginWithEmail, initialState);

  return (
    <form action={formAction} className='space-y-2'>
      <Input
        type='email'
        placeholder='name@example.com'
        name='email' // passed to the server action
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

/* GET /auth/login 200 in 694ms
loginWithEmail FormData {
  [Symbol(state)]: [
    {
      name: '$ACTION_ID_bf7c2532de0bace0223e0ad107748ed79fa70447',
      value: ''
    },
    { name: 'email', value: 'averburgh@gmail.com' }
  ]
}
 POST /auth/login 200 in 86ms
 */
