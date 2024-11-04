import L from 'leaflet';
import { ModalContent } from '../components/Modal';

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

type Arrow = {
  lat: number;
  lon: number;
  angle: number;
};

export const progressData: Record<
  number,
  { goalPosition: L.LatLng; modalContent: ModalContent; arrows?: Arrow[] }
> = {
  1: {
    goalPosition: new L.LatLng(49.30981, 14.14822),
    modalContent: { title: 'Prvni ukol' },
    arrows: [
      {
        lat: 49.30922504167442,
        lon: 14.147300720214846,
        angle: -121,
      },
      {
        lat: 49.31023230376856,
        lon: 14.146603345870973,
        angle: 17,
      },
    ],
  },
  2: {
    goalPosition: new L.LatLng(49.30981, 14.14922),
    modalContent: { title: 'Druhy ukol' },
  },
  3: {
    goalPosition: new L.LatLng(49.30981, 14.14992),
    modalContent: { title: 'Treti ukol' },
  },
  4: {
    goalPosition: new L.LatLng(49.30981, 14.152),
    modalContent: { title: 'Ctvrty ukol' },
  },
  5: {
    goalPosition: new L.LatLng(49.30981, 14.1525),
    modalContent: { title: 'Konec' },
  },
};
