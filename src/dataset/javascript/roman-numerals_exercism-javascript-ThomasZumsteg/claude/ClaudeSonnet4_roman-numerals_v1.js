/* Decimal to Roman numeral mapping */
const decToNum = {   1: "I",   4:"IV",   5: "V",   9:"IX",
				  10: "X",  40:"XL",  50: "L",  90:"XC",
				 100: "C", 400:"CD", 500: "D", 900:"CM",
				1000: "M",
				};

// Pre-sorted array to avoid runtime sorting
const sortedDecimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

function toRoman(remainder) {
	/* Convert a decimal number to a roman numeral */
	
	let result = '';
	
	for (let i = 0; i < sortedDecimals.length; i++) {
		const decimal = sortedDecimals[i];
		while (remainder >= decimal) {
			remainder -= decimal;
			result += decToNum[decimal];
		}
	}
	
	return result;
}

export default toRoman;