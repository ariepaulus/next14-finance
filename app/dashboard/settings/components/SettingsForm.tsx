'use client';

import AlertError from '@/components/AlertError';
import AlertSuccess from '@/components/AlertSuccess';
import DateRangeSelect from '@/components/DateRangeSelect';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import SubmitButton from '@/components/SubmitButton';
import { updateSettings } from '@/app/actions/updateSettings';
import { useFormState } from 'react-dom';
import { DateRange } from '@/enums/enums';

const initialState = {
  message: '',
  error: false,
};

type DefaultsType = {
  fullName?: string;
  defaultView?: DateRange[];
};

export default function SettingsForm({ defaults }: { defaults: DefaultsType }) {
  const [state, formAction] = useFormState(updateSettings, initialState);
  return (
    <form className='space-y-4' action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label htmlFor='fullName'>User full name</Label>
      <Input
        type='text'
        name='fullName'
        id='fullName'
        placeholder='User full name'
        defaultValue={defaults?.fullName}
      />

      <Label htmlFor='defaultView'>Default transactions view</Label>
      <DateRangeSelect
        name='defaultView'
        id='defaultView'
        defaultValue={defaults?.defaultView || [DateRange.last30days]}
      />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}
