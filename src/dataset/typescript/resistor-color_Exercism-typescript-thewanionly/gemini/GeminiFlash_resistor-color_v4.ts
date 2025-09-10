const ResistorColorValues = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
} as const;

type Color = keyof typeof ResistorColorValues;
type Values<T> = T[keyof T];

const colorEntries = Object.entries(ResistorColorValues) as [Color, Values<typeof ResistorColorValues>][];
const colorMap = new Map<Color, Values<typeof ResistorColorValues>>(colorEntries);

export const colorCode = (color: Color): Values<typeof ResistorColorValues> => {
  return colorMap.get(color)!;
};

export const COLORS = Object.freeze(Object.keys(ResistorColorValues));