'use server';

import { createClient } from '@/lib/supabase/server';

type State = void | {
  message: string;
  error?: boolean;
};

export async function uploadAvatar(
  prevState: State,
  formData: FormData
): Promise<State> {
  console.log('uploadAvatar prevState => ', prevState);
  console.log('uploadAvatar formData => ', formData);

  const supabase = createClient();

  const file = formData.get('file');
  if (file === null) {
    return {
      error: true,
      message: 'File is required!',
    };
  }
  if (!(file instanceof File)) {
    return {
      error: true,
      message: 'File is required!',
    };
  }
  let fileExt: string | undefined;
  if (file instanceof File) {
    fileExt = file.name.split('.').pop();
  }
  const fileName = `${Math.random()}.${fileExt}`;
  console.log('fileName => ', fileName);

  const { error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file);
  if (error) {
    return {
      error: true,
      message: 'Error uploading avatar',
    };
  }

  // Removing the old file
  const { data: userData } = await supabase.auth.getUser();
  if (error) {
    return {
      error: true,
      message: 'Something went wrong, try again',
    };
  }

  const avatar = userData?.user?.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from('avatars').remove([avatar]);

    if (error) {
      return {
        error: true,
        message: 'Something went wrong, try again',
      };
    }
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });
  if (dataUpdateError) {
    return {
      error: true,
      message: 'Error associating the avatar with the user',
    };
  }

  return {
    message: 'Updated the user avatar',
  };
}
