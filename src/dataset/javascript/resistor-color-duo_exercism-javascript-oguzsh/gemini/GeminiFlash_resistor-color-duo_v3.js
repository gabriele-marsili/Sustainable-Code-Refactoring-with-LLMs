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
  const digit1 = COLOR_MAP.get(colors[0]);
  const digit2 = COLOR_MAP.get(colors[1]);

  return digit1 * 10 + digit2;
};