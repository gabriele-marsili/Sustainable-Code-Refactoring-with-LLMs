/* Decimal to Roman numeral mapping */
var decToNum = {   1: "I",   4:"IV",   5: "V",   9:"IX",
				  10: "X",  40:"XL",  50: "L",  90:"XC",
				 100: "C", 400:"CD", 500: "D", 900:"CM",
				1000: "M",
				};

function toRoman(number) {
	/* Convert a decimal number to a roman numeral */
	let result = '';
	const decimalValues = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

	for (let i = 0; i < decimalValues.length; i++) {
		const decimal = decimalValues[i];
		while (number >= decimal) {
			result += decToNum[decimal];
			number -= decimal;
		}
	}
	return result;
};

export default toRoman;