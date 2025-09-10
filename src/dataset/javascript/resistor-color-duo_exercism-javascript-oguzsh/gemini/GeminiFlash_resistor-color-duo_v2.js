const COLORS = {
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
  const digit1 = COLORS[colors[0]];
  const digit2 = COLORS[colors[1]];
  return digit1 * 10 + digit2;
};