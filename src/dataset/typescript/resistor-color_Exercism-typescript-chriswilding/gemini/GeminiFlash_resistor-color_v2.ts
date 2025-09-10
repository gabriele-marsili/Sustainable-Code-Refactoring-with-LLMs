type Color = 'black' | 'brown' |  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'grey' | 'white'

const colorMap: { [key in Color]: number } = {
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

export const colorCode = (color: Color): number => {
  return colorMap[color];
}

export const COLORS: Color[] = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
];