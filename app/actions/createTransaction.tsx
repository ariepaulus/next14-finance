'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { formValidation } from '@/ValidationSchemas/formValidation';

export async function createTransaction(formData: FormData) {
  try {
    // Validate data
    const validated = formValidation.safeParse(formData);
    if (!validated.success) {
      throw new Error('Invalid form data!');
    }
    // Implement transaction
    const { error } = await createClient()
      .from('transactions')
      .insert(formData);

    // Handle errors
    if (error) {
      throw new Error('Failed creating the transaction!');
    }

    revalidatePath('/dashboard');
  } catch (error) {
    // Handle the error
    console.error(error);
    // You can also re-throw the error if you want to handle it at a higher level
    // throw error;
  }
}
