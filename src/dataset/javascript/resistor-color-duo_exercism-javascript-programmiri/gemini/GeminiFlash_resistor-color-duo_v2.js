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

function value(colorNameList) {
  const [color1, color2] = colorNameList;
  const code1 = colorMap[color1];
  const code2 = colorMap[color2];

  return code1 * 10 + code2;
}

export { value };