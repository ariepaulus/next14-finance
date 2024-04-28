'use server';

import { createClient } from '@/lib/supabase/server';

type State = void | {
  message: string;
  error?: boolean;
};

export async function loginWithEmail(prevState: State, formData: FormData): Promise<State> {
  // console.log('loginWithEmail formData => ', formData);
  // console.log('loginWithEmail prevState => ', prevState);
  // if ('averburgh@gmail.com' === formData.get('email')) {
  //   return { message: 'Email sent' };
  // }
  const supabase = createClient();

  const email = formData.get('email');
  if (email === null) {
    return console.error('Email is null');
  }

  const { error } = await supabase.auth.signInWithOtp({
    email: email as string,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return { message: 'Error authenticating!', error: true };
  }

  return { message: `Email sent to ${email}` };
}
