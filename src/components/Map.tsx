'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L, { LatLng } from 'leaflet';

export default function App() {
  function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(null);
    const map = useMap();

    useEffect(() => {
      if (typeof window !== 'undefined' && navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (e) => {
            const newLatLng = new L.LatLng(
              e.coords.latitude,
              e.coords.longitude
            );
            setPosition(newLatLng);
            map.flyTo(newLatLng, map.getZoom());
            const radius = e.coords.accuracy;
            const circle = L.circle(newLatLng, { radius });
            circle.addTo(map);
          },
          (error) => console.error('Chyba při sledování polohy:', error),
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );

        return () => navigator.geolocation.clearWatch(watchId);
      }
    }, [map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here.</Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      center={[49.1951, 16.6068]}
      zoom={13}
      scrollWheelZoom
      style={{ height: '100vh' }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
}
