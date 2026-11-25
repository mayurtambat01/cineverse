export type Theatre = {
  id: string;
  name: string;
  location: string;
  screens: string[];
};

export const theatres: Theatre[] = [
  {
    id: "inox-wakad",
    name: "INOX Megaplex - Phoenix Mall",
    location: "Wakad, Pune",
    screens: ["Screen 1", "Screen 2", "Screen 3"],
  },
  {
    id: "pvr-phoenix",
    name: "PVR - Phoenix Marketcity",
    location: "Viman Nagar, Pune",
    screens: ["Screen 1", "Screen 2", "Screen 3"],
  },
  {
    id: "cinepolis-westend",
    name: "Cinepolis - Nexus Westend Mall",
    location: "Aundh, Pune",
    screens: ["Screen 1", "Screen 2", "Screen 3"],
  },
];
