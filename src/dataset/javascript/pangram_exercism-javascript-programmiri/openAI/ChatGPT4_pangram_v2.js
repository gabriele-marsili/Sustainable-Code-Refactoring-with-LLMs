export const isPangram = (string) => {
	const seen = new Set();
	for (let i = 0; i < string.length; i++) {
		const code = string.charCodeAt(i) | 32;
		if (code >= 97 && code <= 122) {
			seen.add(code);
			if (seen.size === 26) return true;
		}
	}
	return false;
};