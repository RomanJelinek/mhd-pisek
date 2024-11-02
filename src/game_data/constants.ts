import L from 'leaflet';
import { ModalProps } from '../components/Modal';

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const progressData: Record<
  number,
  { goalPosition: L.LatLng; modalContent: ModalProps }
> = {
  1: {
    goalPosition: new L.LatLng(49.30981, 14.14822),
    modalContent: { title: 'Prvni ukol' },
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
