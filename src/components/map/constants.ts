import L from 'leaflet';

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

export const targetPosition = [
  new L.LatLng(49.30981, 14.14722),
  new L.LatLng(49.30981, 14.14682),
  new L.LatLng(49.30981, 14.14892),
  new L.LatLng(49.30981, 14.14892),
  new L.LatLng(49.30981, 14.14892),
  new L.LatLng(49.30981, 14.14892),
];
