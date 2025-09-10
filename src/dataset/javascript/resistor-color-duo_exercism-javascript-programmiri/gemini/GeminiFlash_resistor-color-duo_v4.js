const colorMap = {
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

function getColorCode(name) {
  return colorMap[name];
}

function value(colorNameList) {
  let result = 0;
  for (let i = 0; i < Math.min(2, colorNameList.length); i++) {
    const colorCode = getColorCode(colorNameList[i]);
    if (colorCode !== undefined) {
      result = result * 10 + colorCode;
    } else {
      return NaN;
    }
  }
  return result;
}

export { value };