'use client';

import L, { LatLng } from 'leaflet';
import { createContext, ReactNode, useContext, useState } from 'react';

interface LocationContextProps {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
}

const LocationContext = createContext<LocationContextProps | undefined>(
  undefined,
);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [position, setPosition] = useState<LatLng | null>(
    new L.LatLng(49.30881, 14.14722),
  );

  return (
    <LocationContext.Provider value={{ position, setPosition }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context)
    throw new Error('useLocation must be used within a LocationProvider');
  return context;
};

// Default export obalující komponentu pro dynamický import
const LocationProviderWrapper = ({ children }: { children: ReactNode }) => (
  <LocationProvider>{children}</LocationProvider>
);

export default LocationProviderWrapper;
