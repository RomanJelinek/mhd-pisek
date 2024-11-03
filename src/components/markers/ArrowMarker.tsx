import L from 'leaflet';
import { Marker } from 'react-leaflet';
import fastForward from './fast-forward.png';

type ArrowMarkerProps = {
    position: [number, number];
    rotation: number;
}

export const ArrowMarker = ({ position, rotation }: ArrowMarkerProps) => {
    const icon = L.divIcon({
        className: 'custom-arrow-marker',
        html: `
            <div style="transform: rotate(${rotation}deg);">
                <img src="${fastForward.src}" width="32" height="32" />
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16], // Center the icon
    });

    return (
        <>
            <Marker
                position={new L.LatLng(position[0], position[1])}
                icon={icon}
            />
        </>
    );
}
