const colorMap = new Map([
  ['black', 0],
  ['brown', 1],
  ['red', 2],
  ['orange', 3],
  ['yellow', 4],
  ['green', 5],
  ['blue', 6],
  ['violet', 7],
  ['grey', 8],
  ['white', 9],
]);

function getColorCode(name) {
  return colorMap.get(name) ?? -1;
}

function value(colorNameList) {
  let result = 0;
  for (let i = 0; i < colorNameList.length; i++) {
    const code = getColorCode(colorNameList[i]);
    result = result * 10 + code;
  }
  return result;
}

export { value };