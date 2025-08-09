const alphabet = [
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
	'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

const CHAR_CODE_A = 'a'.charCodeAt(0);
const ALPHABET_LENGTH = 26;

export const isPangram = (string) => {
	const lowerCaseString = string.toLowerCase();
	const seen = new Array(ALPHABET_LENGTH).fill(false);
	let uniqueLettersCount = 0;

	for (let i = 0; i < lowerCaseString.length; i++) {
		const charCode = lowerCaseString.charCodeAt(i);

		if (charCode >= CHAR_CODE_A && charCode < CHAR_CODE_A + ALPHABET_LENGTH) {
			const index = charCode - CHAR_CODE_A;
			if (!seen[index]) {
				seen[index] = true;
				uniqueLettersCount++;

				if (uniqueLettersCount === ALPHABET_LENGTH) {
					return true;
				}
			}
		}
	}

	return false;
};