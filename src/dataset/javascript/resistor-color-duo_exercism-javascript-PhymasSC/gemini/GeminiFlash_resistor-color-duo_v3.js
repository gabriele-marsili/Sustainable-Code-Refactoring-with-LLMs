const COLOR_CODE = [
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

export const decodedValue = colorArr => {
  const firstColorIndex = COLOR_CODE.indexOf(colorArr[0]);
  const secondColorIndex = COLOR_CODE.indexOf(colorArr[1]);

  return firstColorIndex * 10 + secondColorIndex;
};