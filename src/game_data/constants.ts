import { ModalModule } from "@/components/modalModules";
import L from "leaflet";

export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
});

type Arrow = {
  lat: number;
  lon: number;
  angle: number;
};

export const progressData: Record<
  string,
  { goalPosition: L.LatLng; modalModules: ModalModule[]; arrows?: Arrow[] }
> = {
  dvorakova: {
    goalPosition: new L.LatLng(49.30981, 14.14822),
    modalModules: [],
  },
};
