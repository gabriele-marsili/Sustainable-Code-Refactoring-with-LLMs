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
  let colorCodes = '';
  for (let i = 0; i < colorNameList.length; i++) {
    colorCodes += getColorCode(colorNameList[i]);
  }
  return Number(colorCodes);
}

export { value };