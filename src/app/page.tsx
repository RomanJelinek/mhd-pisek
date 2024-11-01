import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function Page() {
  const Map = useMemo(
    () =>
      dynamic(() => import('../components/Map'), {
        loading: () => <p>Nacitam mapu</p>,
        ssr: false,
      }),
    []
  );

  return <Map />;
}
