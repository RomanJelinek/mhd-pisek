'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L, { LatLng } from 'leaflet';
import Modal from './Modal';

export default function App() {
  const targetPosition = new L.LatLng(49.30981, 14.14722);
  const [showModal, setShowModal] = useState(false);

  function LocationMarker() {
    const [position, setPosition] = useState<LatLng | null>(
      new L.LatLng(49.30881, 14.14722)
    );
    const map = useMap();

    // geolocation feature
    // useEffect(() => {
    //   console.log('watching');
    //   if (typeof window !== 'undefined' && navigator.geolocation) {
    //     const watchId = navigator.geolocation.watchPosition(
    //       (e) => {
    //         const newLatLng = new L.LatLng(
    //           e.coords.latitude,
    //           e.coords.longitude
    //         );

    //         setPosition(newLatLng);
    //         map.flyTo(newLatLng, map.getZoom());
    //         const radius = e.coords.accuracy;
    //         const circle = L.circle(newLatLng, { radius });
    //         circle.addTo(map);
    //       },
    //       (error) => console.error('Chyba při sledování polohy:', error),
    //       {
    //         enableHighAccuracy: true,
    //         timeout: 5000,
    //         maximumAge: 0,
    //       }
    //     );
    //     return () => navigator.geolocation.clearWatch(watchId);
    //   }
    // }, [map]);
    useEffect(() => {
      const handleKeyPress = (event: KeyboardEvent) => {
        if (position) {
          let newLat = position.lat;
          let newLng = position.lng;

          switch (event.key) {
            case 'ArrowUp':
              newLat += 0.0001;
              break;
            case 'ArrowDown':
              newLat -= 0.0001;
              break;
            case 'ArrowLeft':
              newLng -= 0.0001;
              break;
            case 'ArrowRight':
              newLng += 0.0001;
              break;
            default:
              return;
          }

          const newPosition = new L.LatLng(newLat, newLng);
          setPosition(newPosition);
          map.flyTo(newPosition, map.getZoom());

          const distance = newPosition.distanceTo(targetPosition);
          if (distance < 10) {
            setShowModal(true);
          }
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [position, map]);

    return !position ? null : (
      <Marker position={position}>
        <Popup>Zde stojíte</Popup>
      </Marker>
    );
  }

  return (
    <>
      <MapContainer
        center={[49.30881, 14.14722]}
        zoom={18}
        maxZoom={18}
        minZoom={18}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <Marker position={targetPosition}>
          <Popup>Cílový bod</Popup>
        </Marker>
      </MapContainer>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
