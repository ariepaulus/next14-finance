'use client';

import AlertError from '@/components/AlertError'
import AlertSuccess from '@/components/AlertSuccess';
import Input from '@/components/ui/Input';
import SubmitButton from '@/components/SubmitButton';
import { uploadAvatar } from '@/app/actions/uploadAvatar';
import { useFormState } from 'react-dom';

const initialState = {
  message: '',
  error: false,
};

export default function AvatarPage() {
  const [state, formAction] = useFormState(uploadAvatar, initialState);
  return (
    <>
      <h1 className='text-4xl font-semibold mb-8'>Avatar</h1>
      <form className='space-y-4' action={formAction}>
        {state?.error && <AlertError>{state?.message}</AlertError>}
        {!state?.error && state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}
        <Input type='file' name='file' id='file' />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
