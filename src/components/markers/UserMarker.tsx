"use client";

import { Marker } from "react-leaflet";
import L from "leaflet";
import { ReactNode } from "react";

type UserMarkerProps = {
  position: [number, number];
  userIconType: string;
  children?: ReactNode;
};

export const UserMarker = ({
  children,
  position,
  userIconType,
}: UserMarkerProps) => {
  const icon = L.divIcon({
    className: "",
    html: `<span style="font-size: 40px">${userIconType}</span>`,
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
