'use client';

import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import { TTransactions, TExpenses } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formValidation } from '@/ValidationSchemas/formValidation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { purgeTransactionListCache } from '@/app/actions/purgeTransactionListCache';
import FormError from '@/components/FormError';

export default function TransactionForm() {
  const types: TTransactions[] = [
    'Income',
    'Expenses',
    'Investment',
    'Savings',
  ];

  const categories: TExpenses[] = [
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
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(formValidation),
  });

  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSaving(true);

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          amount: Number(data.amount),
          created_at: `${data.created_at}T00:00:00.000Z`,
        }),
      });
      await purgeTransactionListCache();
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
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
          {/* {errors.type && (
            <span className='mt-2 text-red-500'>A type is required</span>
          )} */}
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
          {/* {errors.category && (
            <span className='mt-2 text-red-500'>A category is required</span>
          )} */}
          <FormError error={errors.category} />
        </div>
        <div>
          <Label className='mb-2'>Date</Label>
          <Input {...register('created_at', { required: true })} />
          {/* {errors.created_at && (
            <span className='mt-2 text-red-500'>
              {errors.created_at.message}
            </span>
          )} */}
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
          {/* {errors.amount && (
            <span className='mt-2 text-red-500'>An amount is required</span>
          )} */}
          <FormError error={errors.amount} />
        </div>
        <div className='col-span-1 md:col-span-2'>
          <Label className='mb-2'>Description</Label>
          <Input {...register('description', { required: true })} />
          {/* {errors.description && (
            <span className='mt-2 text-red-500'>A description is required</span>
          )} */}
          <FormError error={errors.description} />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit' disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}
