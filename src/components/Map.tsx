'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import L from 'leaflet';

export default function App() {
  function LocationMarker() {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        map.locate().on('locationfound', function (e) {
          setPosition(e.latlng as any);
          map.flyTo(e.latlng, map.getZoom());
          const radius = e.accuracy;
          const circle = L.circle(e.latlng, radius);
          circle.addTo(map);
          setBbox(e.bounds.toBBoxString().split(',') as any);
        });
      }
    }, [map]);

    return position === null ? null : (
      <Marker position={position as any}>
        <Popup>
          You are here. <br />
          Map bbox: <br />
          <b>Southwest lng</b>: {bbox[0]} <br />
          <b>Southwest lat</b>: {bbox[1]} <br />
          <b>Northeast lng</b>: {bbox[2]} <br />
          <b>Northeast lat</b>: {bbox[3]}
        </Popup>
      </Marker>
    );
  }

  return (
    <MapContainer
      key={new Date().getTime()}
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
