var decToNum = [
  [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
  [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
  [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
];

function toRoman(remainer) {
  let result = '';
  for (const [decimal, numeral] of decToNum) {
    while (remainer >= decimal) {
      remainer -= decimal;
      result += numeral;
    }
  }
  return result;
}

export default toRoman;