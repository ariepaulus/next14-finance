import { FieldError } from 'react-hook-form';

interface FormErrorProps {
  error?: FieldError;
}

export default function FormError({ error }: FormErrorProps) {
  return error && <span className='text-red-500'>{error.message}</span>;
}
