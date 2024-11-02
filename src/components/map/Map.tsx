'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import LocationMarker from './LocationMarker';
import { progressData } from '../../game_data/constants';
import Modal from '../Modal';
import { useModal } from '@/context/ModalContext';
import { useLocation } from '@/context/LocationContext';
import { useProgress } from '@/context/ProgressContext';

const Map = () => {
  const { position } = useLocation();
  const { isModalOpen, openModal, closeModal } = useModal();
  const { currentStep, nextStep } = useProgress();

  const { goalPosition } = progressData[currentStep] || {};
  const { modalContent } = progressData[currentStep] || {};

  const handleCloseModal = () => {
    nextStep();
    closeModal();
  };

  useEffect(() => {
    if (position) {
      const distance = position.distanceTo(goalPosition);
      if (distance < 5 && !isModalOpen) {
        openModal();
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
        <Marker position={goalPosition}>
          <Popup>Cílový bod</Popup>
        </Marker>
      </MapContainer>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        {...modalContent}
      />
    </>
  );
};

export default Map;
