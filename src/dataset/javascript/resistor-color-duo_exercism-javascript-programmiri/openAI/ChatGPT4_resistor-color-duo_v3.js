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

function getColorCode(name) {
  return colorMap[name] ?? -1;
}

function value(colorNameList) {
  let result = 0;
  for (const name of colorNameList) {
    const code = getColorCode(name);
    if (code === -1) return NaN;
    result = result * 10 + code;
  }
  return result;
}

export { value };