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
  return COLOR_CODE.indexOf(colorArr[0]) * 10 + COLOR_CODE.indexOf(colorArr[1]);
};