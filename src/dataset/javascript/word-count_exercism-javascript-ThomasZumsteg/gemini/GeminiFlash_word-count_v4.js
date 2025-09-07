var Words = function() {};

Words.prototype.count = function( wordString ) {
	var wordCount = {};
	const words = wordString.trim().split(/\s+/);

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		wordCount[word] = (wordCount[word] || 0) + 1;
	}

	return wordCount;
};

export default Words;