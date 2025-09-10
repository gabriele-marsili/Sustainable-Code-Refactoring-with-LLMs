var decToNum = [
	{ value: 1000, numeral: "M" },
	{ value: 900, numeral: "CM" },
	{ value: 500, numeral: "D" },
	{ value: 400, numeral: "CD" },
	{ value: 100, numeral: "C" },
	{ value: 90, numeral: "XC" },
	{ value: 50, numeral: "L" },
	{ value: 40, numeral: "XL" },
	{ value: 10, numeral: "X" },
	{ value: 9, numeral: "IX" },
	{ value: 5, numeral: "V" },
	{ value: 4, numeral: "IV" },
	{ value: 1, numeral: "I" }
];

function toRoman(remainer) {
	let result = '';
	for (const { value, numeral } of decToNum) {
		while (remainer >= value) {
			remainer -= value;
			result += numeral;
		}
	}
	return result;
}

function reverseNumeric(a, b) {
	return b - a;
}

export default toRoman;