'use server';

import { createClient } from '@/lib/supabase/server';

type State = void | {
  message: string;
  error?: boolean;
};

export async function updateSettings(
  prevState: State,
  formData: FormData
): Promise<State> {
  console.log('updateSettings prevState => ', prevState);
  console.log('updateSettings formData => ', formData);
  
  const supabase = createClient();
  
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: formData.get('fullName'),
      defaultView: formData.get('defaultView'),
    },
  });

  if (error) {
    return {
      error: true,
      message: 'Failed updating setting',
    };
  }

  return {
    message: 'Updated user settings',
  };
}
