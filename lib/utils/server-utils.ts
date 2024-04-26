'use server';

import { createClient } from '@/lib/supabase/server';
import { ITransactionItem } from '@/types/types';

export async function fetchTransactions() {
  const supabase = createClient();
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading transactions:', error.message);
    throw new Error('Failed to fetch transactions');
  }

  return transactions as ITransactionItem[] | [];
}
