type Color = 'black' | 'brown' |  'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'violet' | 'grey' | 'white'

export const colorCode = (color: Color): number => {
  return COLORS.indexOf(color)
}

export const COLORS: Array<Color> = [
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
]
