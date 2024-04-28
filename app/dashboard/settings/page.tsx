import { createClient } from '@/lib/supabase/server';
import SettingsForm from './components/SettingsForm';
import { DateRange } from '@/enums/enums';

type UserMetadata = {
  defaultView?: DateRange[];
  email: string;
  email_verified: boolean;
  fullName?: string;
  phone_verified: boolean;
  sub: string;
};

type DefaultsType = {
  fullName?: string;
  defaultView?: DateRange[];
};

export default async function SettingsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user?.user_metadata);

  if (user === null) {
    return <p>You need to log in to view this page.</p>;
  } else {
    const { user_metadata: defaults } = user;

    // Ensure fullName and defaultView are defined
    if (!defaults.fullName) {
      defaults.fullName = 'Default Name'; // replace with your actual default value
    }
    if (!defaults.defaultView) {
      defaults.defaultView = [DateRange.last30days]; // replace with your actual default value
    }

    return (
      <>
        <h1 className='text-4xl font-semibold mb-8'>Settings</h1>
        <SettingsForm defaults={defaults as DefaultsType} />
      </>
    );
  }
}

// Redirect to Login Page if user is not logged in
// import { useHistory } from 'react-router-dom';

// export default async function SettingsPage() {
//   const supabase = createClient();
//   const history = useHistory();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user === null) {
//     history.push('/login');
//   } else {
//     const { user_metadata: defaults } = user;
//     return (
//       <>
//         <h1 className='text-4xl font-semibold mb-8'>Settings</h1>
//         <SettingsForm defaults={defaults} />
//       </>
//     );
//   }
// }
