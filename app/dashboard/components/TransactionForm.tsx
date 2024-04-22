'use client';

import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import { TTransactions, TExpenses } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formValidation } from '@/ValidationSchemas/formValidation';

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

  const onSubmit = (data: any) => console.log(data);

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
          {errors.type && (
            <span className='mt-2 text-red-500'>A type is required</span>
          )}
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
          {errors.category && (
            <span className='mt-2 text-red-500'>A category is required</span>
          )}
        </div>
        <div>
          <Label className='mb-2'>Date</Label>
          <Input {...register('created_at', { required: true })} />
          {errors.created_at && (
            <span className='mt-2 text-red-500'>
              {errors.created_at.message}
            </span>
          )}
        </div>
        <div>
          <Label className='mb-2'>Amount</Label>
          <Input
            type='number'
            {...register('amount', {
              required: true,
            })}
          />
          {errors.amount && (
            <span className='mt-2 text-red-500'>An amount is required</span>
          )}
        </div>
        <div className='col-span-1 md:col-span-2'>
          <Label className='mb-2'>Description</Label>
          <Input {...register('description', { required: true })} />
          {errors.description && (
            <span className='mt-2 text-red-500'>A description is required</span>
          )}
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
