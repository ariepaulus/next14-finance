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
  // console.log('defaults => ', defaults);
  // console.log(state);

  return (
    <form className='space-y-4' action={formAction}>
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.formErrors?.fullName &&
        state?.message &&
        state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}

      <Label htmlFor='fullName'>User full name</Label>
      <Input
        type='text'
        name='fullName'
        id='fullName'
        placeholder='Full name of the user'
        defaultValue={defaults?.fullName}
      />
      {state?.formErrors?.fullName && (
        <AlertError>{state.formErrors.fullName}</AlertError>
      )}

      <Label htmlFor='defaultView'>Default transactions view</Label>
      <DateRangeSelect
        name='defaultView'
        id='defaultView'
        defaultValue={defaults?.defaultView || [DateRange.last30days]}
      />
      {state?.formErrors?.defaultView && (
        <AlertError>{state.formErrors.defaultView}</AlertError>
      )}

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}

/* defaults =>  avatar: "0.3857266619700981.jpg", defaultView: "last7days", email: "averburgh@gmail.com", email_verified: false, fullName: "Arie Verburgh", phone_verified: false, sub: "701bd907-9c48-4a33-9751-14a94e16a373"
 */
