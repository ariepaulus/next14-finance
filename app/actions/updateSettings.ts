'use server';

import { settingsValidation } from '@/ValidationSchemas/settingsValidation';
import { createClient } from '@/lib/supabase/server';

type State = void | {
  message: string;
  error?: boolean;
  formErrors?: {
    fullName?: string;
    defaultView?: string;
  };
};

export async function updateSettings(
  prevState: State,
  formData: FormData
): Promise<State> {
  // console.log('updateSettings prevState => ', prevState);
  // console.log('updateSettings formData => ', formData);

  const validated = settingsValidation.safeParse({
    fullName: formData.get('fullName'),
    defaultView: formData.get('defaultView'),
  });

  if (!validated.success) {
    const formErrors = validated.error.issues.reduce(
      (errors: Record<string, string>, issue) => {
        errors[issue.path[0]] = issue.message;
        return errors;
      },
      {} as Record<string, string>
    );

    return {
      ...prevState,
      message: 'Validation failed',
      formErrors,
    };
  }

  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.fullName,
      defaultView: validated.data.defaultView,
    },
  });

  if (error) {
    return {
      error: true,
      message: 'Failed updating settings',
    };
  }

  return {
    message: 'Updated user settings',
  };
}

/* updateSettings prevState =>  { message: '', error: false }
updateSettings formData =>  FormData {
  [Symbol(state)]: [
    { name: 'fullName', value: 'Arie Verburgh' },
    { name: 'defaultView', value: 'last30days' }
  ]
}
 */
