export const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
];

const COLOR_MAP = new Map(COLORS.map((color, index) => [color, index]));

export const decodedValue = colors => {
  const firstDigit = COLOR_MAP.get(colors[0]);
  const secondDigit = COLOR_MAP.get(colors[1]);
  return firstDigit * 10 + secondDigit;
};