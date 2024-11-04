import { Marker } from "react-leaflet";
import L, { LatLng } from "leaflet";
import footprints from "./images/footprints.png";
import { ReactNode } from "react";

type UserMarkerProps = {
  position: LatLng;
  userIconType: UserIconType;
  children?: ReactNode;
};

type UserIconType = "adventurer" | "vehicle" | "animal" | "footprint";

const userIconMap = new Map<UserIconType, string>([
  ["footprint", footprints.src],
  ["vehicle", ""],
  ["adventurer", ""],
  ["animal", ""],
]);

export const UserMarker = ({
  position,
  userIconType,
  children,
}: UserMarkerProps) => {
  const icon = L.icon({
    iconUrl: userIconMap.get(userIconType) ?? "",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker position={position} icon={icon}>
      {children}
    </Marker>
  );
};
