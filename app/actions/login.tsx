'use server';

import { createClient } from '@/lib/supabase/server';

export async function login({ prevState, formData }) {
  const supabase = createClient();
  const email = formData.get('email');
  if (typeof email !== 'string') {
    return {
      error: true,
      message: 'Email is required!',
    };
  }
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });
  if (error) {
    return {
      error: true,
      message: 'Error authenticating!',
    };
  }
  return {
    message: `Email sent to ${email}`,
  };
}
