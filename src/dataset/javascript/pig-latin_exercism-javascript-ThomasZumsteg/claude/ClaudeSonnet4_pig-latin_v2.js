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
	const quIndex = word.indexOf('qu');
	if (quIndex === 0) {
		const afterQu = word.slice(2);
		return afterQu + 'quay';
	}
	
	if (quIndex > 0) {
		const consonantCluster = word.slice(0, quIndex + 2);
		const rest = word.slice(quIndex + 2);
		if (rest && /[aeiouy]/.test(rest[0])) {
			return rest + consonantCluster + 'ay';
		}
	}
	
	for (let i = 0; i < word.length; i++) {
		const char = word[i];
		if (/[aeiouy]/.test(char)) {
			if (i === 0) {
				return word + 'way';
			}
			const consonants = word.slice(0, i);
			const rest = word.slice(i);
			return rest + consonants + 'ay';
		}
	}
	
	return word;
}

export default { translate: translate };