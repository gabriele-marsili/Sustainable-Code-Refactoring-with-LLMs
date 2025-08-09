const alphabetSet = new Set('abcdefghijklmnopqrstuvwxyz');
export const isPangram = (string) => {
	const seen = new Set();
	for (const char of string.toLowerCase()) {
		if (alphabetSet.has(char)) {
			seen.add(char);
			if (seen.size === 26) return true;
		}
	}
	return false;
};