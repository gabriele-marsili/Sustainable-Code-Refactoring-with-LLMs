const colorsMap = new Map<keyof typeof colorsMap, number>([
  ['black', 0],
  ['brown', 1],
  ['red', 2],
  ['orange', 3],
  ['yellow', 4],
  ['green', 5],
  ['blue', 6],
  ['violet', 7],
  ['grey', 8],
  ['white', 9],
]);

export const decodedValue = (colors: (keyof typeof colorsMap)[]): number => 
  colorsMap.get(colors[0])! * 10 + colorsMap.get(colors[1])!;