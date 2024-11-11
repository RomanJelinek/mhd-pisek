import CircularProgress from '@mui/material/CircularProgress';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useMemo } from 'react';

export default function Page() {
  const DynamicLocationProvider = useMemo(
    () =>
      dynamic(() => import('@/context/LocationContext'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );
  const Map = useMemo(
    () =>
      dynamic(() => import('../components/map/Map'), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  return (
    <DynamicLocationProvider>
      <Link href="/profile">Profile</Link>
      <Map />
    </DynamicLocationProvider>
  );
}
