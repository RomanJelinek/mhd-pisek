import { ModalModule } from '@/components/modalModules';
import L from 'leaflet';

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
  { goalPosition: L.LatLng; modalModules: ModalModule[]; arrows?: Arrow[] }
> = {
  1: {
    goalPosition: new L.LatLng(49.30981, 14.14822),
    modalModules: [
      {
        module: 'question',
        moduleProps: {
          question: 'Kdo prebehl most prvni?',
          options: [
            { value: 1, label: 'Jelen' },
            { value: 2, label: 'Liska' },
            { value: 3, label: 'Mottl' },
          ],
        },
      },
      {
        module: 'perex',
        moduleProps: {
          content:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Duis risus. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Nulla non lectus sed nisl molestie malesuada. Et harum quidem rerum facilis est et expedita distinctio. Quisque tincidunt scelerisque libero. Nam sed tellus id magna elementum tincidunt. Aliquam ornare wisi eu metus. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Nulla non lectus sed nisl molestie malesuada. Duis risus. Nam quis nulla. Aenean id metus id velit ullamcorper pulvinar. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Ut tempus purus at lorem.',
        },
      },
    ],
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
    modalModules: [],
  },
  3: {
    goalPosition: new L.LatLng(49.30981, 14.14992),
    modalModules: [],
  },
  4: {
    goalPosition: new L.LatLng(49.30981, 14.152),
    modalModules: [],
  },
  5: {
    goalPosition: new L.LatLng(49.30981, 14.1525),
    modalModules: [],
  },
};
