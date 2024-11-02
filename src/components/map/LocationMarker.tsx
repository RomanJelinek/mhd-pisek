'use client';

import L from 'leaflet';
import { useEffect } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import { useLocation } from '@/context/LocationContext';

const LocationMarker = () => {
  const { position, setPosition } = useLocation();
  const map = useMap();

  useEffect(() => {
    if (!window) return;
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
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position, map, setPosition]);

  return position ? (
    <Marker position={position}>
      <Popup>Zde stojíte</Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;

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
