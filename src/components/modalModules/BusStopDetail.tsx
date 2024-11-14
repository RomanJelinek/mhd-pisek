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
  Chip,
  Switch,
  FormControlLabel,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
  const [showPastDepartures, setShowPastDepartures] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!line) return null;

  const dataSets: LineData[] = [
    line1,
    line2,
    line3,
    line4,
    line5,
    line6,
    line7,
    line1Turned,
    line2Turned,
    line3Turned,
    line4Turned,
    line5Turned,
    line6Turned,
    line7Turned,
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
    <Paper elevation={3} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography variant="h4" gutterBottom align="center">
        Odjezdy ze stanice: {line}
      </Typography>
      {pastDeparturesExist && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <FormControlLabel
            control={
              <Switch
                checked={showPastDepartures}
                onChange={() => setShowPastDepartures(!showPastDepartures)}
                color="primary"
              />
            }
            label={
              <Typography variant="body2" color="textSecondary">
                {showPastDepartures
                  ? "Skrýt minulé odjezdy"
                  : "Zobrazit minulé odjezdy"}
              </Typography>
            }
          />
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

          return (
            <Accordion
              key={`departure-${index}`}
              sx={{
                mb: 1,
                opacity: isPast ? 0.6 : 1,
                transition: "opacity 0.3s",
                "&:hover": {
                  opacity: 1,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: theme.palette.background.default,
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  width="100%"
                  flexWrap={isMobile ? "wrap" : "nowrap"}
                >
                  <Box display="flex" alignItems="center" mr={2} minWidth={80}>
                    <AccessTimeIcon
                      sx={{ mr: 1, color: theme.palette.text.secondary }}
                    />
                    <Typography>{format(departureTime, "HH:mm")}</Typography>
                  </Box>
                  <Chip
                    icon={<DirectionsBusIcon />}
                    label={departure.lineNumber}
                    color="primary"
                    size="small"
                    sx={{ mr: 2 }}
                  />
                  <Typography
                    color="textSecondary"
                    sx={{
                      fontStyle: "italic",
                      flexGrow: 1,
                      textAlign: isMobile ? "left" : "right",
                    }}
                  >
                    směr {departure.direction}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {departure.following.map((stop, idx) => (
                    <ListItem
                      key={`following-stop-${index}-${idx}`}
                      divider={idx !== departure.following.length - 1}
                    >
                      <ListItemText
                        primary={stop.station}
                        secondary={stop.time}
                        primaryTypographyProps={{ variant: "body2" }}
                        secondaryTypographyProps={{ variant: "caption" }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Paper>
  );
};

export default BusStopDetail;
