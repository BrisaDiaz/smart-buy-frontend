import {Market} from "../interfaces";
import veaLogo from "../public/vea-logo.png";
// import carrefourLogo from "../public/carrefour-logo.png";
import hiperlibertadLogo from "../public/hiperlibertad-logo.png";
import discoLogo from "../public/disco-logo.png";
import cotoLogo from "../public/coto-logo.png";
import cordiezLogo from "../public/cordiez-logo.png";
import jumboLogo from "../public/jumbo-logo.png";
import supermamiLogo from "../public/super-mami-logo.png";
import diaLogo from "../public/dia-logo.png";
import maxiconsumoLogo from "../public/maxiconsumo-logo.png";
import laAnonimaLogo from "../public/la-anonima-logo.png";
export const MARKET_OPTIONS: Market[] = [
  // "carrefour",
  "cordiez",
  "coto",
  "dia",
  "disco",
  "hiperlibertad",
  "jumbo",
  "la anonima online",
  "maxiconsumo",
  "super mami",
  "vea",
];

export const logoTable: {[key: string]: string} = {
  cordiez: cordiezLogo,
  hiperlibertad: hiperlibertadLogo,
  coto: cotoLogo,
  jumbo: jumboLogo,
  disco: discoLogo,
  vea: veaLogo,
  // carrefour: carrefourLogo,
  dia: diaLogo,
  "la anonima online": laAnonimaLogo,
  maxiconsumo: maxiconsumoLogo,
  "super mami": supermamiLogo,
};

export const API_BASE_PATH = import.meta.env.VITE_API_BASE_PATH || "http://localhost:4000";
export const ES_LOCALS = {
  dateTime: "%A, %e de %B de %Y, %X",
  date: "%d/%m/%Y",
  time: "%H:%M:%S",
  periods: ["AM", "PM"],
  days: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  shortDays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  months: [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  shortMonths: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
};
