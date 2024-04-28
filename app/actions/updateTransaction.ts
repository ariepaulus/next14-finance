'use server';

import { formValidation } from '@/ValidationSchemas/formValidation';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface updateTransactionProps {
  id: number;
  formData: FormData;
}

export async function updateTransaction({
  id,
  formData,
}: updateTransactionProps) {
  try {
    // Validate the data
    const validated = formValidation.safeParse(formData);
    if (!validated.success) {
      throw new Error('Invalid data');
    }
    // Implement the transaction
    const { error } = await createClient()
      .from('transactions')
      .update(formData)
      .eq('id', id);

    // Handle the errors
    if (error) {
      throw new Error('Failed updating the transaction');
    }

    revalidatePath('/dashboard');
  } catch (error) {
    // Handle the error
    console.error(error);
  }
}
