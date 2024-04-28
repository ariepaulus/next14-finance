'use server';

import { createClient } from '@/lib/supabase/server';

interface updateSettingsProps {
  prevState: any;
  formData: FormData;
}

export async function updateSettings({
  prevState,
  formData,
}: updateSettingsProps) {
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
