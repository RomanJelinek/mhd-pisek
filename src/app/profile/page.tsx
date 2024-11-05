import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";

export default function Profile() {
  const DynamicLocationProvider = useMemo(
    () =>
      dynamic(() => import("@/context/LocationContext"), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  const IconPicker = useMemo(
    () =>
      dynamic(() => import("@/components/iconPicker/IconPicker"), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  const ProfileMap = useMemo(
    () =>
      dynamic(() => import("@/components/map/ProfileMap"), {
        loading: () => <CircularProgress />,
        ssr: false,
      }),
    [],
  );

  return (
    <DynamicLocationProvider>
      <IconPicker />
      <ProfileMap />
    </DynamicLocationProvider>
  );
}
