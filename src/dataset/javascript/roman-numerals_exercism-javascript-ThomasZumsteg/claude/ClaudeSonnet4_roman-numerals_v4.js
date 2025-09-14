const decToNum = {
  1000: "M", 900: "CM", 500: "D", 400: "CD",
  100: "C", 90: "XC", 50: "L", 40: "XL",
  10: "X", 9: "IX", 5: "V", 4: "IV", 1: "I"
};

const decimalNumbers = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

function toRoman(remainder) {
  let result = '';
  
  for (let i = 0; i < decimalNumbers.length; i++) {
    const decimal = decimalNumbers[i];
    while (remainder >= decimal) {
      remainder -= decimal;
      result += decToNum[decimal];
    }
  }
  
  return result;
}

function reverseNumeric(a, b) {
  return b - a;
}

export default toRoman;