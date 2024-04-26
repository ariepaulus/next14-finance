'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function deleteTransaction(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from('transactions').delete().eq('id', id);
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath('/dashboard');
}
