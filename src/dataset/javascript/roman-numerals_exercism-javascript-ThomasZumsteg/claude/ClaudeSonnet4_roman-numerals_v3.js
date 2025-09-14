const decToNum = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"]
];

function toRoman(remainder) {
  let result = '';
  
  for (const [decimal, numeral] of decToNum) {
    while (remainder >= decimal) {
      remainder -= decimal;
      result += numeral;
    }
  }
  
  return result;
}

function reverseNumeric(a, b) {
  return b - a;
}

export default toRoman;