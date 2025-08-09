const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'c', // This 'c' is a duplicate, meaning 'g' is missing from the original alphabet array.
	// The optimization preserves this original behavior as per the requirements.
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

export const isPangram = (string) => {
	const lowerCaseString = string.toLowerCase();

	// To significantly reduce execution time and CPU usage, we convert the
	// input string into a Set of its unique characters. This allows for
	// O(1) average time complexity for character lookups, instead of
	// O(N) for `string.includes()`.
	const uniqueCharsInString = new Set(lowerCaseString);

	// We iterate through the predefined 'alphabet' array (which includes the original typo/bug)
	// and check if each character from 'alphabet' is present in our 'uniqueCharsInString' Set.
	// This maintains the original function's behavior and ensures all characters defined
	// in the original 'alphabet' array are present in the input string.
	// The overall time complexity is improved from O(M * K) to O(M + K),
	// where M is the length of the input string and K is the size of the alphabet array.
	return alphabet.every((char) => uniqueCharsInString.has(char));
};