'use client';

import { UserMarker } from '@/components';
import { useLocation } from '@/context/LocationContext';
import L from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

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
    <UserMarker position={[position.lat, position.lng]} />
  ) : null;
};

export default LocationMarker;
