enum ResistorColorValues {
  black,
  brown,
  red,
  orange,
  yellow,
  green,
  blue,
  violet,
  grey,
  white
}

type ResistorColor = keyof typeof ResistorColorValues

const colorValues: { [key in ResistorColor]: number } = {
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
};

export function decodedResistorValue([firstBand, secondBand, thirdBand]: ResistorColor[]): string {
  const firstDigit = colorValues[firstBand];
  const secondDigit = colorValues[secondBand];
  const multiplier = colorValues[thirdBand];

  let ohms = (firstDigit * 10 + secondDigit) * Math.pow(10, multiplier);

  if (ohms >= 1000) {
    ohms /= 1000;
    return `${ohms} kiloohms`;
  }

  return `${ohms} ohms`;
}