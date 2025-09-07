// @ts-check

/**
 * Calculates the sum of the two input arrays.
 *
 * @param {number[]} array1
 * @param {number[]} array2
 * @returns {number} sum of the two arrays
 */
export function twoSum(array1, array2) {
	let num1 = 0;
	let num2 = 0;
	
	for (let i = 0; i < array1.length; i++) {
		num1 = num1 * 10 + array1[i];
	}
	
	for (let i = 0; i < array2.length; i++) {
		num2 = num2 * 10 + array2[i];
	}
	
	return num1 + num2;
}

/**
 * Checks whether a number is a palindrome.
 *
 * @param {number} value
 * @returns {boolean}  whether the number is a palindrome or not
 */
export function luckyNumber(value) {
	const str = value.toString();
	const len = str.length;
	
	for (let i = 0; i < len >> 1; i++) {
		if (str[i] !== str[len - 1 - i]) {
			return false;
		}
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
	if (input == null || input === "") return "Required field";
	
	const num = +input;
	if (!num || num === 0) return "Must be a number besides 0";
	
	return "";
}