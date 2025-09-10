function translate(phrase) {
	return phrase.split(' ').map(pigize).join(' ');
}

function pigize(word) {
	const quMatch = /^([^aeioy]*qu)(.*)$/.exec(word);
	if (quMatch) return quMatch[2] + quMatch[1] + "ay";

	const vowelMatch = /^(.*?)([aeiouy].*)$/.exec(word);
	return vowelMatch ? vowelMatch[2] + vowelMatch[1] + "ay" : word;
}

export default { translate };