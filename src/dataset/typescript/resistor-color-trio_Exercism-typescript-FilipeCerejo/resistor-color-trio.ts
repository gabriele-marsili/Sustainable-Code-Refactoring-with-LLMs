
const CV = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
}

type Color = keyof typeof CV;

export function decodedResistorValue(colors: Color[]) {
  const multiplier = Math.pow(10,CV[colors[2]]);
  let rawResistorValue = Number(`${CV[colors[0]]}${CV[colors[1]]}`) * multiplier;
  
  if(rawResistorValue / 1000 > 1) {
    return `${rawResistorValue / 1000} kiloohms`;
  } else if(rawResistorValue / 1000000 > 1) {
    return `${rawResistorValue / 1000} megaohms`;
  } else {
     return  `${rawResistorValue} ohms`;
  }
}
