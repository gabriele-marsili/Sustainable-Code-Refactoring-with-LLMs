const colorMap: { [key: string]: number } = {
  'black': 0,
  'brown': 1,
  'red': 2,
  'orange': 3,
  'yellow': 4,
  'green': 5,
  'blue': 6,
  'violet': 7,
  'grey': 8,
  'white': 9,
};

export const colorCode = (code: string): number => {
  return colorMap[code] !== undefined ? colorMap[code] : -1;
}

export const COLORS = ['black','brown','red','orange','yellow','green','blue','violet','grey','white'];