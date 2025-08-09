export const isPangram = (string) => {
	const lowerCaseString = string.toLowerCase();
	const seen = new Set();
	
	for (const char of lowerCaseString) {
		if (char >= 'a' && char <= 'z') {
			seen.add(char);
			if (seen.size === 26) {
				return true;
			}
		}
	}
	
	return seen.size === 26;
};