function translate(phrase) {
	/* Translates a phrase into piglatin */
	return phrase.split(' ').map(pigize).join(' ');
}

function pigize(word) {
	/* Turns a word into piglatin */
	const regex = /^([^aeioy]*qu|.*?)([aeiouy].*)$/;
	const matches = regex.exec(word);
	return matches ? matches[2] + matches[1] + "ay" : word;
}

export default { translate };