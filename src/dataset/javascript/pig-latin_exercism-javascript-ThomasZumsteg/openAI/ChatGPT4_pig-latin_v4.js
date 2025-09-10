function translate(phrase) {
	return phrase.replace(/\b([^aeioy]*qu|.*?[aeiouy])([^aeiouy]*)/g, (_, prefix, suffix) => suffix + prefix + "ay");
}

function pigize(word) {
	return word.replace(/^([^aeioy]*qu|.*?[aeiouy])([^aeiouy]*)/, (_, prefix, suffix) => suffix + prefix + "ay");
}

export default { translate };