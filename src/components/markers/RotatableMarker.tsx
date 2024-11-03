import L from 'leaflet';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Marker, useMap } from 'react-leaflet';
import fastForward from './fast-forward.png';
import { Box, Button, styled, Typography } from '@mui/material';

type RotatableMarkerProps = {
  position: [number, number];
  rotation?: number;
};

export const RotatableMarker = ({
  position,
  rotation,
}: RotatableMarkerProps) => {
  const map = useMap();
  const [angle, setAngle] = useState(rotation ?? 0);
  const [markerPos, setMarkerPos] = useState<L.LatLng>(
    new L.LatLng(position[0], position[1])
  );
  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const rotationAnimationId = useRef<number | null>(null);

  // Custom Icon for the marker with the image rotated according to the angle
  const icon = L.divIcon({
    className: 'custom-arrow-marker',
    html: `
            <div style="transform: rotate(${angle}deg);">
                <img src="${fastForward.src}" width="32" height="32" />
            </div>
        `,
    iconSize: [32, 32],
    iconAnchor: [16, 16], // Center the icon
  });

  const updateButtonContainerPosition = useCallback(() => {
    if (buttonContainerRef.current) {
      const markerPoint = map.latLngToContainerPoint(markerPos);
      const container = map.getContainer();
      const { left, top } = container.getBoundingClientRect();

      // Adjust offsets to position buttons next to the marker
      buttonContainerRef.current.style.left = `${markerPoint.x + left + 30}px`; // Horizontal spacing
      buttonContainerRef.current.style.top = `${markerPoint.y + top - 5}px`; // Vertical alignment
    }
  }, [map, markerPos]);

  useEffect(() => {
    updateButtonContainerPosition();
    map.on('zoom move', updateButtonContainerPosition);
    return () => {
      map.off('zoom move', updateButtonContainerPosition);
    };
  }, [map, markerPos, updateButtonContainerPosition]);

  // Smooth rotation using requestAnimationFrame
  const rotateClockwise = () => {
    rotationAnimationId.current = requestAnimationFrame(() => {
      setAngle((prevAngle) => prevAngle + 1); // Rotate by 1 degree for smooth rotation
      rotateClockwise();
    });
  };

  const rotateCounterClockwise = () => {
    rotationAnimationId.current = requestAnimationFrame(() => {
      setAngle((prevAngle) => prevAngle - 1); // Rotate by 1 degree for smooth rotation
      rotateCounterClockwise();
    });
  };

  const stopRotation = () => {
    if (rotationAnimationId.current !== null) {
      cancelAnimationFrame(rotationAnimationId.current);
      rotationAnimationId.current = null;
    }
  };

  return (
    <>
      <Marker
        position={markerPos}
        icon={icon}
        draggable
        ref={(ref) => {
          if (ref) {
            markerRef.current = ref;
            markerRef.current.dragging?.enable();
          }
        }}
        eventHandlers={{
          dragstart: () => stopRotation(), // Ensure rotation stops when dragging starts
          dragend: (e) => {
            const newLatLng = e.target.getLatLng();
            setMarkerPos(newLatLng); // Update marker position after dragging
            updateButtonContainerPosition(); // Update button position only after drag ends
          },
        }}
      />

      <Box
        position="fixed"
        display="flex"
        gap={1}
        ref={buttonContainerRef}
        zIndex={1000}
      >
        <Button
          size="small"
          variant="contained"
          onMouseDown={rotateCounterClockwise}
          onMouseUp={stopRotation}
          onMouseLeave={stopRotation}
        >
          <Typography fontSize={20}>⟳</Typography>
        </Button>
        <Button
          size="small"
          variant="contained"
          onMouseDown={rotateClockwise}
          onMouseUp={stopRotation}
          onMouseLeave={stopRotation}
        >
          <Typography fontSize={20}>⟳</Typography>
        </Button>
      </Box>
    </>
  );
};
