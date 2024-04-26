'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { formValidation } from '@/ValidationSchemas/formValidation';

export async function createTransaction(formData: FormData) {
  // Validate data
  const validated = formValidation.safeParse(formData);
  if (!validated.success) {
    throw new Error('Invalid form data!');
  }
  // Implement transaction
  const { error } = await createClient()
    .from('transactions')
    .insert([validated.data]);

  // Handle errors
  if (error) {
    throw new Error('Failed to create transaction!');
  }

  revalidatePath('/dashboard');

  return <div>createTransaction</div>;
}
