const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'c', // Duplicate 'c'
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

// Pre-compute a Set of unique alphabet characters once at module load time.
// This avoids repeated processing of the alphabet array and provides O(1) average time complexity for lookups.
const uniqueAlphabetChars = new Set(alphabet);

export const isPangram = (string) => {
	// Create a mutable Set to keep track of the alphabet characters that are still missing
	// in the input string. Initialize it with all unique alphabet characters.
	const missingChars = new Set(uniqueAlphabetChars);

	// Iterate through the input string character by character.
	// This approach avoids creating a new full lowercase string,
	// and processes each character only once.
	for (const char of string) {
		const lowerChar = char.toLowerCase();

		// If the current character is one of the unique alphabet characters
		// that we are still looking for, remove it from the 'missingChars' set.
		if (missingChars.has(lowerChar)) {
			missingChars.delete(lowerChar);

			// If the set of missing characters becomes empty, it means we have
			// found all unique alphabet characters, so we can short-circuit
			// and return true immediately.
			if (missingChars.size === 0) {
				return true;
			}
		}
	}

	// If the loop completes and 'missingChars' is not empty, it means
	// not all unique alphabet characters were found in the string.
	return false;
};