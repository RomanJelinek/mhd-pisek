'use client';

import { useUser } from '@/context/UserContext';
import L from 'leaflet';
import { ReactNode, useTransition } from 'react';
import { Marker } from 'react-leaflet';

type UserMarkerProps = {
  position: [number, number];
  children?: ReactNode;
};

export const UserMarker = ({ children, position }: UserMarkerProps) => {
  const { icon: userIcon } = useUser();
  const [isPending, startTransition] = useTransition();

  const icon = L.divIcon({
    className: '',
    html: `<span style="font-size: 40px">${userIcon}</span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker
      position={new L.LatLng(position[0], position[1])}
      icon={icon}
      draggable
    >
      {children}
    </Marker>
  );
};
