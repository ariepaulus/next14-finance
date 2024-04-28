'use client';

import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import {
  TTransactions,
  TExpenses,
  TIncome,
  TInvestments,
  TSavings,
  TransactionError,
} from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formValidation } from '@/ValidationSchemas/formValidation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateTransaction } from '@/app/actions/updateTransaction';
import { createTransaction } from '@/app/actions/createTransaction';
import FormError from '@/components/FormError';

interface TransactionFormProps {
  initialData: any;
}

export default function TransactionForm({ initialData }: TransactionFormProps) {
  const types: TTransactions[] = [
    'Income',
    'Expenses',
    'Investment',
    'Savings',
  ];

  const incomeCategories: TIncome[] = [
    'Salary/Wages',
    'Pension',
    'Investment',
    'Editing',
    'Rental',
    'Social Benefits',
    'Other',
  ];

  const expenseCategories: TExpenses[] = [
    'Groceries',
    'Transport',
    'Housing',
    'Entertainment',
    'Restaurant',
    'Health',
    'Education',
    'Utilities',
    'Other',
  ];

  const investmentCategories: TInvestments[] = [
    'Stocks',
    'Dividends',
    'Interest',
    'Property',
    'Capital Gains',
    'Other',
  ];

  const savingsCategories: TSavings[] = [
    'Emergency',
    'Retirement',
    'Special Purpose',
    'Other',
  ];

  type FormData = {
    type: TTransactions;
    category: TExpenses;
    created_at: string;
    description: string;
    amount: number;
    date: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(formValidation),
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split('T')[0],
    },
  });

  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [lastError, setLastError] = useState<TransactionError | null>(null);

  const type = watch('type');
  const editing = Boolean(initialData);

  let categories: TIncome[] | TExpenses[] | TInvestments[] | TSavings[];
  switch (type) {
    case 'Income':
      categories = incomeCategories;
      break;
    case 'Expenses':
      categories = expenseCategories;
      break;
    case 'Investment':
      categories = investmentCategories;
      break;
    case 'Savings':
      categories = savingsCategories;
      break;
    default:
      categories = [];
  }

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    setLastError(null);

    try {
      // Validate the data with the dynamically adjusted schema
      const result = formValidation.safeParse(data);
      if (!result.success) {
        throw new Error(
          result.error.issues.map(issue => issue.message).join(', ')
        );
      }

      if (editing) {
        // Edit action
        await updateTransaction(initialData.id, data);
      } else {
        await createTransaction(data);
      }

      router.push('/dashboard');
    } catch (error: any) {
      if ('message' in error) {
        setLastError({
          type: 'TransactionError',
          message: error.message || 'An unexpected error occurred.',
        });
        console.error(
          'Validation or transaction creation error:',
          error.message
        );
      }
    } finally {
      setIsSaving(false);
      setLastError(null);
    }
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label className='mb-2'>Type</Label>
          <Select defaultValue='' {...register('type')}>
            <option value='' disabled>
              Select a type
            </option>
            {types.map(type => (
              <option key={type}>{type}</option>
            ))}
          </Select>
          <FormError error={errors.type} />
        </div>
        <div>
          <Label className='mb-2'>Category</Label>
          <Select defaultValue='' {...register('category')}>
            <option value='' disabled>
              Select a category
            </option>
            {categories.map(category => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          <FormError error={errors.category} />
        </div>
        <div>
          <Label className='mb-2'>Date</Label>
          <Input
            {...register('created_at', { required: true })}
            disabled={editing}
          />
          <FormError error={errors.created_at} />
        </div>
        <div>
          <Label className='mb-2'>Amount</Label>
          <Input
            type='number'
            {...register('amount', {
              required: true,
            })}
          />
          <FormError error={errors.amount} />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <Label className='mb-2'>Description</Label>
          <Input {...register('description', { required: true })} />
          <FormError error={errors.description} />
        </div>
      </div>
      <div className='flex justify-between items-center'>
        <div>{lastError && <FormError error={lastError} />}</div>
        <Button type='submit' disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
