const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const colorMap = new Map(colors.map((color, index) => [color, index]));

export const decodedValue = colorInputs => {
  const [firstColor, secondColor] = colorInputs;
  return colorMap.get(firstColor) * 10 + colorMap.get(secondColor);
};