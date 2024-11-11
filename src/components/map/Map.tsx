"use client";

import LocationMarker from "@/components/map/LocationMarker";
import { useLocation } from "@/context/LocationContext";
import { progressData } from "@/game_data/constants";
import { useModalControl } from "@/hooks/useModalControl";
import { resolveModules } from "@/utils/resolveModules";
import L, { Icon } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { busIcon } from "../markers/BusStopIcon";
import Modal from "../Modal";
import BusStopDetail from "../modalModules/BusStopDetail";
import { lines } from "./lines";

const Map = () => {
  const { position } = useLocation();
  const { modalState, openModal, closeModal } = useModalControl();
  const [busLine, setBusLine] = useState<string | undefined>(undefined);

  const { goalPosition, modalModules } = progressData["dvorakova"] || {};

  const modalContent = resolveModules(modalModules);

  const handleMarkerClick = (line: string) => () => {
    setBusLine(line);
    openModal(<BusStopDetail line={line} />);
  };

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    if (position) {
      const distance = position.distanceTo(goalPosition);
      if (distance < 20 && !modalState.isOpen) {
        openModal(modalContent);
      }
    }
  }, [goalPosition, position]);

  return (
    <>
      <MapContainer
        center={[49.30881, 14.14722]}
        zoom={17}
        maxZoom={17}
        minZoom={14}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        touchZoom={false}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={`https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?apikey=${process.env.NEXT_PUBLIC_MAP_API_KEY}`}
        />
        <LocationMarker />
        {lines.map((line) => {
          return (
            <Marker
              icon={busIcon}
              position={line.gps}
              eventHandlers={{
                click: handleMarkerClick(line.name),
              }}
            >
              <Popup>{line.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <Modal
        modalContent={<BusStopDetail line={busLine} />}
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Map;
