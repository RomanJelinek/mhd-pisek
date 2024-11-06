'use client';

import { UserMarker } from '@/components';
import { useLocation } from '@/context/LocationContext';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const ProfileMap = () => {
  const { position } = useLocation();
  const markerPosition: [number, number] = position
    ? [position.lat, position.lng]
    : [49.30881, 14.14722];

  return (
    <>
      <MapContainer
        center={[49.30881, 14.14722]}
        zoom={17}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        style={{ height: '300px', margin: '0 20px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        />

        <UserMarker position={markerPosition} />
      </MapContainer>
    </>
  );
};

export default ProfileMap;
