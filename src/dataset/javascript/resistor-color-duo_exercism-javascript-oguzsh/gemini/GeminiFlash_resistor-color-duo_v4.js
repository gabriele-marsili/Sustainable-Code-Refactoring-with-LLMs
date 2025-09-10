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

export const decodedValue = colors => {
  const color1 = colors[0];
  const color2 = colors[1];

  let digit1 = COLORS.indexOf(color1);
  let digit2 = COLORS.indexOf(color2);

  return digit1 * 10 + digit2;
};