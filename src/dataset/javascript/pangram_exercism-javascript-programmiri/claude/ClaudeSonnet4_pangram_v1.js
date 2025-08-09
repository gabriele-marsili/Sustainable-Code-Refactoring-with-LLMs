export const isPangram = (string) => {
	const lowerCaseString = string.toLowerCase();
	const seen = new Set();
	
	for (let i = 0; i < lowerCaseString.length; i++) {
		const char = lowerCaseString[i];
		if (char >= 'a' && char <= 'z') {
			seen.add(char);
			if (seen.size === 26) {
				return true;
			}
		}
	}
	
	return seen.size === 26;
};