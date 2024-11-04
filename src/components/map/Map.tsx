'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import LocationMarker from './LocationMarker';
import { progressData } from '@/game_data/constants';
import { useLocation } from '@/context/LocationContext';
import { useProgress } from '@/context/ProgressContext';
import { ArrowMarker } from '@/components/markers';
import Modal from '../Modal';
import { useModalControl } from '@/hooks/useModalControl';
import { resolveModules } from '@/utils/resolveModules';

const Map = () => {
  const { position } = useLocation();
  const { currentStep, nextStep } = useProgress();
  const { modalState, openModal, closeModal } = useModalControl();

  const { goalPosition, modalModules, arrows } =
    progressData[currentStep] || {};

  const modalContent = resolveModules(modalModules);

  const handleCloseModal = () => {
    closeModal();
    nextStep();
  };

  useEffect(() => {
    if (position) {
      const distance = position.distanceTo(goalPosition);
      if (distance < 5 && !modalState.isOpen) {
        openModal(modalContent);
      }
    }
  }, [goalPosition, position]);

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
        <Marker position={goalPosition}>
          <Popup>Cílový bod</Popup>
        </Marker>
        {arrows?.map((arrow, i) => (
          <ArrowMarker
            key={i}
            position={[arrow.lat, arrow.lon]}
            rotation={arrow.angle}
          />
        ))}
      </MapContainer>
      <Modal
        modalContent={modalContent}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Map;
