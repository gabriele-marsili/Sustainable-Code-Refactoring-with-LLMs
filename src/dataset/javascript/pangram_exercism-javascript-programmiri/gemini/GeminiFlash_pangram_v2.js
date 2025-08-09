export const isPangram = (string) => {
	// A boolean array to track the presence of each letter from 'a' to 'z'.
	// Each index corresponds to a letter (0 for 'a', 1 for 'b', ..., 25 for 'z').
	const foundLetters = new Array(26).fill(false);
	let uniqueLettersFoundCount = 0; // Counter for the number of unique alphabet letters found.

	// Iterate over each character in the input string.
	for (let i = 0; i < string.length; i++) {
		const charCode = string.charCodeAt(i);
		let index = -1;

		// Check if the character is a lowercase English letter ('a' to 'z').
		if (charCode >= 97 && charCode <= 122) { // 'a' is 97, 'z' is 122
			index = charCode - 97; // Calculate index (0-25)
		}
		// Check if the character is an uppercase English letter ('A' to 'Z').
		else if (charCode >= 65 && charCode <= 90) { // 'A' is 65, 'Z' is 90
			index = charCode - 65; // Calculate index (0-25)
		}

		// If the character is an English letter and it hasn't been found yet, mark it.
		if (index !== -1 && !foundLetters[index]) {
			foundLetters[index] = true;
			uniqueLettersFoundCount++;

			// Optimization: If all 26 unique letters are found, we can immediately return true.
			// No need to process the rest of the string.
			if (uniqueLettersFoundCount === 26) {
				return true;
			}
		}
	}

	// After checking all characters in the string, return true if all 26 letters were found,
	// otherwise return false.
	return uniqueLettersFoundCount === 26;
};