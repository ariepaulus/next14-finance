import { Button } from './ui/Button';
import { useFormStatus } from 'react-dom';
import { Loader } from 'lucide-react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | null;

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | null;

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: ReactNode;
  variant?: ButtonVariant; // Change this line
  size?: ButtonSize; // Adjust this if 'size' prop also has specific values
}

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-1`}
      disabled={pending}
    >
      {pending && <Loader className='animate-spin w-4 h-4' />}
      <span>{props.children}</span>
    </Button>
  );
}
