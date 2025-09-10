const COLOR_MAP = {
  "black": 0,
  "brown": 1,
  "red": 2,
  "orange": 3,
  "yellow": 4,
  "green": 5,
  "blue": 6,
  "violet": 7,
  "grey": 8,
  "white": 9
};

export const decodedValue = colors => {
  const digit1 = COLOR_MAP[colors[0]];
  const digit2 = COLOR_MAP[colors[1]];

  return digit1 * 10 + digit2;
};