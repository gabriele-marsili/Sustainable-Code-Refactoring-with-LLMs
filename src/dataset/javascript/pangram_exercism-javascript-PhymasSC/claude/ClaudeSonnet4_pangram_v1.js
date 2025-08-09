export const isPangram = sentence => {
	const seen = new Set();
	const lowerSentence = sentence.toLowerCase();
	
	for (let i = 0; i < lowerSentence.length; i++) {
		const char = lowerSentence[i];
		if (char >= 'a' && char <= 'z') {
			seen.add(char);
			if (seen.size === 26) return true;
		}
	}
	
	return false;
};