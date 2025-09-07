// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
	let sum1 = 0, sum2 = 0;
	for (const digit of array1) sum1 = sum1 * 10 + digit;
	for (const digit of array2) sum2 = sum2 * 10 + digit;
	return sum1 + sum2;
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean}  whether the number is a palindrome or not
 */
export function luckyNumber(value) {
	const str = `${value}`;
	const len = str.length;
	for (let i = 0; i < len / 2; i++) {
		if (str[i] !== str[len - 1 - i]) return false;
	}
	return true;
}

/**
 * Determines the error message that should be shown to the user
 * for the given input value.
 *
 * @param {string|null|undefined} input
 * @returns {string} error message
 */
export function errorMessage(input) {
	if (!input) return "Required field";
	const num = Number(input);
	return num > 0 ? "" : "Must be a number besides 0";
}