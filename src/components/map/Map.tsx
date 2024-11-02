'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import LocationMarker from './LocationMarker';
import { targetPosition } from './constants';
import Modal from '../Modal';
import { useModal } from '@/context/ModalContext';
import { useLocation } from '@/context/LocationContext';
import { useProgress } from '@/context/ProgressContext';

const Map = () => {
  const { position } = useLocation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { currentStep, nextStep } = useProgress();

  useEffect(() => {
    if (position) {
      const distance = position.distanceTo(targetPosition[currentStep]);
      if (distance < 5 && !isModalOpen) {
        openModal();
        nextStep();
      }
    }
  }, [position]);

  return (
    <>
      <MapContainer
        center={[49.30881, 14.14722]}
        zoom={17}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        style={{ height: '100vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        />
        <LocationMarker />
        <Marker position={targetPosition[currentStep]}>
          <Popup>Cílový bod</Popup>
        </Marker>
      </MapContainer>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default Map;
