const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const isPangram = (string) => {
	const lowerCaseString = string.toLowerCase();
	const charSet = new Set(lowerCaseString);
	
	for (let i = 0; i < alphabet.length; i++) {
		if (!charSet.has(alphabet[i])) {
			return false;
		}
	}
	return true;
};