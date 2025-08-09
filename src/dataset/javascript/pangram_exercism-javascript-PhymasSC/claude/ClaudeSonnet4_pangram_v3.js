export const isPangram = sentence => {
	const seen = new Set();
	
	for (const char of sentence.toLowerCase()) {
		const code = char.charCodeAt(0);
		if (code >= 97 && code <= 122) {
			seen.add(char);
			if (seen.size === 26) return true;
		}
	}
	
	return false;
};