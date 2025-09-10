export const toRoman = (decimal: number): string => {
  if (decimal < 1 || decimal > 3999) {
    return "";
  }

  const romanMap: { [key: number]: string } = {
    1: "I",
    4: "IV",
    5: "V",
    9: "IX",
    10: "X",
    40: "XL",
    50: "L",
    90: "XC",
    100: "C",
    400: "CD",
    500: "D",
    900: "CM",
    1000: "M",
  };

  const values = Object.keys(romanMap)
    .map(Number)
    .sort((a, b) => b - a);

  let result = "";
  let remaining = decimal;

  for (const value of values) {
    while (remaining >= value) {
      result += romanMap[value];
      remaining -= value;
    }
  }

  return result;
};