const ColorValues = [
  'black', 'brown', 'red', 'orange', 'yellow', 
  'green', 'blue', 'violet', 'grey', 'white'
] as const;

type Color = typeof ColorValues[number];

export function decodedValue(colors: Color[]): number {
  return ColorValues.indexOf(colors[0]) * 10 + ColorValues.indexOf(colors[1]);
}