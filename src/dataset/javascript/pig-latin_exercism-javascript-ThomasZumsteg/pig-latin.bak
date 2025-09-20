function translate(phrase) {
	/* Translates a phrase into piglatin */
	const words = phrase.split(' ');
	const result = new Array(words.length);
	
	for (let i = 0; i < words.length; i++) {
		result[i] = pigize(words[i]);
	}
	
	return result.join(' ');
}

function pigize(word) {
	/* Turns a word into piglatin */
	const len = word.length;
	if (len === 0) return word;
	
	// Check for consonant clusters ending with 'qu'
	for (let i = 0; i < len - 1; i++) {
		if (word[i] === 'q' && word[i + 1] === 'u') {
			return word.slice(i + 2) + word.slice(0, i + 2) + "ay";
		}
		if (/[aeiouy]/.test(word[i])) {
			break;
		}
	}
	
	// Find first vowel
	for (let i = 0; i < len; i++) {
		if (/[aeiouy]/.test(word[i])) {
			return word.slice(i) + word.slice(0, i) + "ay";
		}
	}
	
	return word;
}

export default { translate: translate };