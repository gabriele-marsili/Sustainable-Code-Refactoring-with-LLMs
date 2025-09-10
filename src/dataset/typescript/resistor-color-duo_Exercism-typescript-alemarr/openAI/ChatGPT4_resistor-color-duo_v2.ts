const colorsMap = [
  'black', 'brown', 'red', 'orange', 'yellow', 
  'green', 'blue', 'violet', 'grey', 'white'
];

export const decodedValue = (colors: (typeof colorsMap[number])[]): number => 
  colorsMap.indexOf(colors[0]) * 10 + colorsMap.indexOf(colors[1]);