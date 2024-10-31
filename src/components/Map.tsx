'use client';

import React, { FC, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Nastavení ikony pro Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MyLocationMarker: FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          console.log(pos);
          const newPosition: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setPosition(newPosition);
          map.setView(newPosition); // Posun mapy na aktuální pozici uživatele
        },
        (error) => {
          console.error('Chyba při získávání polohy:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      // Vyčistit sledování polohy při odpojení komponenty
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error('Geolokace není ve vašem prohlížeči podporována.');
    }
  }, [map]);

  console.log(position);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Vaše aktuální poloha</Popup>
    </Marker>
  );
};

const Map: FC = () => {
  return (
    <MapContainer
      style={{ width: '100%', height: '100vh' }}
      center={[49.30881, 14.14722]} // Výchozí střed Písku
      zoom={15}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyLocationMarker /> {/* Sledování a zobrazení aktuální polohy */}
    </MapContainer>
  );
};

export default Map;
