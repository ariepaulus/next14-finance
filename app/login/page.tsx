import { Label } from '@/components/ui/Label';
import { login, signup } from './actions';
import Input from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  return (
    <form>
      <Label className='mb-2 mt-2' htmlFor='email'>
        Email:
      </Label>
      <Input id='email' name='email' type='email' required />
      <Label className='mb-2 mt-2' htmlFor='password'>
        Password:
      </Label>
      <Input id='password' name='password' type='password' required />
      <Button className='mt-2 mr-2' formAction={login}>
        Log in
      </Button>
      <Button formAction={signup}>Sign up</Button>
    </form>
  );
}
