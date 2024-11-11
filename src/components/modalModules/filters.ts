// filters.ts
import { parseISO, isWithinInterval, isSameDay, getDay } from "date-fns";
import { Road } from "./BusStopDetail";

// Pomocná funkce pro kontrolu státních svátků v ČR
const isPublicHoliday = (date: Date): boolean => {
  const holidays = [
    parseISO(`${date.getFullYear()}-01-01`), // Nový rok
    parseISO(`${date.getFullYear()}-05-01`), // Svátek práce
    parseISO(`${date.getFullYear()}-05-08`), // Den vítězství
    parseISO(`${date.getFullYear()}-07-05`), // Cyril a Metoděj
    parseISO(`${date.getFullYear()}-07-06`), // Jan Hus
    parseISO(`${date.getFullYear()}-09-28`), // Den české státnosti
    parseISO(`${date.getFullYear()}-10-28`), // Den vzniku samostatného československého státu
    parseISO(`${date.getFullYear()}-11-17`), // Den boje za svobodu a demokracii
    parseISO(`${date.getFullYear()}-12-24`), // Štědrý den
    parseISO(`${date.getFullYear()}-12-25`), // 1. svátek vánoční
    parseISO(`${date.getFullYear()}-12-26`), // 2. svátek vánoční
  ];

  return holidays.some((holiday) => isSameDay(date, holiday));
};

// Funkce pro kontrolu, zda je aktuální datum v seznamu specifických dat
const isSpecificDate = (dates: string[], date: Date): boolean => {
  return dates.some((dateStr) => isSameDay(date, parseISO(dateStr)));
};

export const applyFilters = (road: Road): boolean => {
  const today = new Date();
  const todayDay = getDay(today); // 0 = neděle, 1 = pondělí, ..., 6 = sobota

  let shouldRun: boolean | undefined = undefined;

  if (!road.features || road.features.length === 0) {
    return true; // Autobus jede každý den, pokud nejsou žádné features
  }

  const featurePriority = ["prac", "7", "6", "†", "99", "68", "98", "29", "28"];

  for (const feature of featurePriority) {
    if (!road.features.includes(feature)) continue;

    switch (feature) {
      case "prac": {
        if (todayDay >= 1 && todayDay <= 5) {
          shouldRun = true;
        } else {
          shouldRun = false;
        }
        break;
      }
      case "7": {
        if (todayDay === 0) {
          shouldRun = true;
        } else {
          shouldRun = false;
        }
        break;
      }
      case "6": {
        if (todayDay === 6) {
          shouldRun = true;
        } else {
          shouldRun = false;
        }
        break;
      }
      case "†": {
        if (todayDay === 0 || isPublicHoliday(today)) {
          shouldRun = true;
        } else {
          shouldRun = false;
        }
        break;
      }
      case "99": {
        const start = parseISO("2024-05-31");
        const end = parseISO("2024-09-29");
        if (isWithinInterval(today, { start, end })) {
          shouldRun = true;
        } else {
          shouldRun = false;
        }
        break;
      }
      case "68": {
        const runDates = [
          "2024-07-05",
          "2024-10-28",
          "2025-01-01",
          "2025-04-18",
          "2025-04-21",
          "2025-05-01",
          "2025-05-08",
        ];
        const notRunDates = ["2024-10-27", "2025-04-20"];
        if (isSpecificDate(notRunDates, today)) {
          shouldRun = false;
        } else if (isSpecificDate(runDates, today)) {
          shouldRun = true;
        }
        break;
      }
      case "98": {
        const start = parseISO("2024-07-01");
        const end = parseISO("2024-09-01");
        if (isWithinInterval(today, { start, end })) {
          shouldRun = false;
        }
        break;
      }
      case "29": {
        const notRunDates = ["2024-12-24", "2024-12-31"];
        if (isSpecificDate(notRunDates, today)) {
          shouldRun = false;
        }
        break;
      }
      case "28": {
        const notRunDates = ["2024-07-06", "2024-09-28", "2025-04-19"];
        if (isSpecificDate(notRunDates, today)) {
          shouldRun = false;
        }
        break;
      }
      default:
        break;
    }

    if (shouldRun !== undefined) {
      // Jakmile jsme našli odpovídající feature, můžeme vrátit výsledek
      return shouldRun;
    }
  }

  // Pokud žádná feature nerozhodla, autobus jede
  return true;
};
