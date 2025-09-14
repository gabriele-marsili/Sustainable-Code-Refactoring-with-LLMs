function translate(phrase) {
	return phrase.split(' ').map(pigize).join(' ');
}

function pigize(word) {
	const firstChar = word[0];
	if (!firstChar) return word;
	
	const isVowel = firstChar === 'a' || firstChar === 'e' || firstChar === 'i' || 
					firstChar === 'o' || firstChar === 'u' || firstChar === 'y';
	
	if (isVowel) {
		return word + 'ay';
	}
	
	if (word.length > 1 && firstChar === 'q' && word[1] === 'u') {
		return word.slice(2) + 'quay';
	}
	
	let consonantEnd = 0;
	const len = word.length;
	
	while (consonantEnd < len) {
		const char = word[consonantEnd];
		if (char === 'a' || char === 'e' || char === 'i' || 
			char === 'o' || char === 'u' || char === 'y') {
			break;
		}
		consonantEnd++;
	}
	
	if (consonantEnd === len) return word;
	
	return word.slice(consonantEnd) + word.slice(0, consonantEnd) + 'ay';
}

export default { translate: translate };