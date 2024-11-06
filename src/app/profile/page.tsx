import { ProgressProvider } from '@/context/ProgressContext';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';

export default async function Profile() {
  const DynamicLocationProvider = dynamic(
    () => import('@/context/LocationContext'),
    {
      loading: () => <CircularProgress />,
      ssr: false,
    },
  );

  const IconPicker = dynamic(() => import('@/components/preGame/PreGame'), {
    loading: () => <CircularProgress />,
    ssr: false,
  });

  const ProfileMap = dynamic(() => import('@/components/map/ProfileMap'), {
    loading: () => <CircularProgress />,
    ssr: false,
  });

  return (
    <DynamicLocationProvider>
      <ProgressProvider maxSteps={5}>
        <IconPicker />
        <ProfileMap />
      </ProgressProvider>
    </DynamicLocationProvider>
  );
}
