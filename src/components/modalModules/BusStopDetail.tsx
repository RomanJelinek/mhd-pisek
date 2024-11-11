// BusStopDetail.tsx
import React, { useState } from "react";
import line1 from "../../buses/linka1.json";
import line2 from "../../buses/linka2.json";
import line3 from "../../buses/linka3.json";
import line4 from "../../buses/linka4.json";
import line5 from "../../buses/linka5.json";
import line6 from "../../buses/linka6.json";
import line7 from "../../buses/linka7.json";

import line1Turned from "../../buses/linka1-otocena.json";
import line2Turned from "../../buses/linka2-otocena.json";
import line3Turned from "../../buses/linka3-otocena.json";
import line4Turned from "../../buses/linka4-otocena.json";
import line5Turned from "../../buses/linka5-otocena.json";
import line6Turned from "../../buses/linka6-otocena.json";
import line7Turned from "../../buses/linka7-otocena.json";

import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { parse, isBefore, format } from "date-fns";
import { applyFilters } from "./filters";

type Stop = {
  stop: string;
  time: string;
};

export type Road = {
  features: string[];
  stops: Stop[];
};

type LineData = {
  lineNumber: number;
  roads: Road[];
};

type DirectionData = {
  time: string;
  direction: string;
  lineNumber: number;
  following: { station: string; time: string }[];
};

interface BusStopDetailProps {
  line?: string;
}

const BusStopDetail: React.FC<BusStopDetailProps> = ({ line }) => {
  if (!line) return null;

  const [showPastDepartures, setShowPastDepartures] = useState(false);

  const dataSets: LineData[] = [
    { ...line1, roads: line1.roads },
    { ...line2, roads: line2.roads },
    { ...line3, roads: line3.roads },
    { ...line4, roads: line4.roads },
    { ...line5, roads: line5.roads },
    { ...line6, roads: line6.roads },
    { ...line7, roads: line7.roads },
    { ...line1Turned, roads: line1Turned.roads },
    { ...line2Turned, roads: line2Turned.roads },
    { ...line3Turned, roads: line3Turned.roads },
    { ...line4Turned, roads: line4Turned.roads },
    { ...line5Turned, roads: line5Turned.roads },
    { ...line6Turned, roads: line6Turned.roads },
    { ...line7Turned, roads: line7Turned.roads },
  ];

  const extractStops = (dataSet: LineData): DirectionData[] => {
    return dataSet.roads.filter(applyFilters).flatMap((road) => {
      const sortedStops = [...road.stops].sort(
        (a, b) =>
          parse(a.time, "HH:mm", new Date()).getTime() -
          parse(b.time, "HH:mm", new Date()).getTime()
      );

      return sortedStops.reduce<DirectionData[]>((acc, stop, index, stops) => {
        if (stop.stop === line) {
          const followingStops = stops.slice(index + 1).map((nextStop) => ({
            station: nextStop.stop,
            time: nextStop.time,
          }));
          if (followingStops.length > 0) {
            acc.push({
              time: stop.time,
              direction: followingStops[0].station,
              lineNumber: dataSet.lineNumber,
              following: followingStops,
            });
          }
        }
        return acc;
      }, []);
    });
  };

  const allDepartures = dataSets
    .flatMap(extractStops)
    .sort(
      (a, b) =>
        parse(a.time, "HH:mm", new Date()).getTime() -
        parse(b.time, "HH:mm", new Date()).getTime()
    );

  const currentTime = new Date();

  const pastDeparturesExist = allDepartures.some((departure) =>
    isBefore(parse(departure.time, "HH:mm", new Date()), currentTime)
  );

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Odjezdy ze stanice: {line}
      </Typography>
      {pastDeparturesExist && (
        <Box display="flex" justifyContent="flex-end" mb={1}>
          <Typography
            fontSize={13}
            color="secondary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => setShowPastDepartures(!showPastDepartures)}
          >
            {showPastDepartures
              ? "Skrýt minulé odjezdy"
              : "Zobrazit minulé odjezdy"}
          </Typography>
        </Box>
      )}
      {allDepartures
        .filter(
          (departure) =>
            showPastDepartures ||
            isBefore(currentTime, parse(departure.time, "HH:mm", new Date()))
        )
        .map((departure, index) => {
          const departureTime = parse(departure.time, "HH:mm", new Date());
          const isPast = isBefore(departureTime, currentTime);

          console.log(departureTime);

          return (
            <Accordion
              sx={{
                width: "100%",
                ...(isPast && { opacity: 0.5 }),
              }}
              key={`departure-${index}`}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box display="flex" alignItems="center" width="100%">
                  <Typography>{format(departureTime, "HH:mm")}</Typography>
                  <Box display="flex" ml={4} gap={4}>
                    <Typography color="info.main">
                      {departure.lineNumber}
                    </Typography>
                    <i>
                      <Typography color="textSecondary" mr={2}>
                        směr {departure.direction}
                      </Typography>
                    </i>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {departure.following.map((stop, idx) => (
                    <ListItem key={`following-stop-${index}-${idx}`}>
                      <ListItemText
                        primary={stop.station}
                        secondary={stop.time}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
};

export default BusStopDetail;
