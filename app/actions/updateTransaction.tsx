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
  const validated = formValidation.safeParse(formData);
  if (!validated.success) {
    throw new Error('Invalid data');
  }

  const { error } = await createClient()
    .from('transactions')
    .update(formData)
    .eq('id', id);

  if (error) {
    throw new Error('Failed creating the transaction');
  }

  revalidatePath('/dashboard');
}
