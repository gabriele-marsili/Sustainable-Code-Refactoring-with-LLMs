const colorMap = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
};

function value(colorNameList) {
  let result = 0;
  for (const color of colorNameList) {
    result = result * 10 + colorMap[color];
  }
  return result;
}

export { value };