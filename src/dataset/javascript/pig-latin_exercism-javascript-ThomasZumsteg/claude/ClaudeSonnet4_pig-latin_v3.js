function translate(phrase) {
	const words = phrase.split(' ');
	const result = new Array(words.length);
	
	for (let i = 0; i < words.length; i++) {
		result[i] = pigize(words[i]);
	}
	
	return result.join(' ');
}

function pigize(word) {
	if (!word) return word;
	
	const firstChar = word[0].toLowerCase();
	
	if (firstChar === 'a' || firstChar === 'e' || firstChar === 'i' || 
		firstChar === 'o' || firstChar === 'u' || firstChar === 'y') {
		return word + "ay";
	}
	
	if (word.length > 1 && word.substring(0, 2) === 'qu') {
		return word.substring(2) + "quay";
	}
	
	let consonantEnd = 0;
	for (let i = 0; i < word.length; i++) {
		const char = word[i].toLowerCase();
		if (char === 'a' || char === 'e' || char === 'i' || 
			char === 'o' || char === 'u' || char === 'y') {
			break;
		}
		consonantEnd = i + 1;
		if (i < word.length - 1 && word.substring(i, i + 2) === 'qu') {
			consonantEnd = i + 2;
			break;
		}
	}
	
	if (consonantEnd === 0) return word + "ay";
	
	return word.substring(consonantEnd) + word.substring(0, consonantEnd) + "ay";
}

export default { translate: translate };