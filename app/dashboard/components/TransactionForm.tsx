'use client';

import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Select from '@/components/ui/Select';
import { TTransactions, TExpenses } from '@/types/types';
import { useForm } from 'react-hook-form';

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
  } = useForm<FormData>();

  const onSubmit = (data: any) => console.log(data);

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label className='mb-2'>Type</Label>
          <Select {...register('type', { required: true })}>
            {errors.type && <span>This field is required</span>}
            {types.map(type => (
              <option key={type}>{type}</option>
            ))}
          </Select>
        </div>

        <div>
          <Label className='mb-2'>Category</Label>
          <Select {...register('category', { required: true })}>
            {errors.category && <span>This field is required</span>}
            {categories.map(category => (
              <option key={category}>{category}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label className='mb-2'>Date</Label>
          <Input {...register('created_at', { required: true })} />
          {errors.created_at && <span>This field is required</span>}
        </div>
        <div>
          <Label className='mb-2'>Amount</Label>
          <Input type='number' {...register('amount', { required: true })} />
          {errors.amount && <span>This field is required</span>}
        </div>
        <div>
          <Label className='mb-2'>Description</Label>
          <Input {...register('description', { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
      </div>
      <div className='flex justify-end'>
        <Button type='submit'>Save</Button>
      </div>
    </form>
  );
}
