import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react';
import { ProgressProvider } from '@/context/ProgressContext';

export default function Page() {
  const DynamicLocationProvider = useMemo(
    () =>
      dynamic(() => import('@/context/LocationContext'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    []
  );
  const Map = useMemo(
    () =>
      dynamic(() => import('../components/map/Map'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    []
  );

  return (
    <DynamicLocationProvider>
      <ProgressProvider maxSteps={5}>
        <Map />
      </ProgressProvider>
    </DynamicLocationProvider>
  );
}
