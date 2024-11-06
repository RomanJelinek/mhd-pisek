import { fetchUserData } from '@/actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';

export default async function Profile() {
  const { icon } = await fetchUserData();

  const DynamicLocationProvider = dynamic(
    () => import('@/context/LocationContext'),
    {
      loading: () => <CircularProgress />,
      ssr: false,
    },
  );

  const IconPicker = dynamic(
    () => import('@/components/iconPicker/IconPicker'),
    {
      loading: () => <CircularProgress />,
      ssr: false,
    },
  );

  const ProfileMap = dynamic(() => import('@/components/map/ProfileMap'), {
    loading: () => <CircularProgress />,
    ssr: false,
  });

  return (
    <DynamicLocationProvider>
      <IconPicker initialIcon={icon} />
      <ProfileMap />
    </DynamicLocationProvider>
  );
}
