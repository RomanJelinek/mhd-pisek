import { ProgressProvider } from '@/context/ProgressContext';
import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Profile() {
  const DynamicLocationProvider = useMemo(
    () =>
      dynamic(() => import('@/context/LocationContext'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  const IconPicker = useMemo(
    () =>
      dynamic(() => import('@/components/preGame/PreGame'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  const ProfileMap = useMemo(
    () =>
      dynamic(() => import('@/components/map/ProfileMap'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  return (
    <DynamicLocationProvider>
      <ProgressProvider maxSteps={5}>
        <IconPicker />
        <ProfileMap />
      </ProgressProvider>
    </DynamicLocationProvider>
  );
}
