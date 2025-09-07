var Words = function() {}

Words.prototype.count = function( wordString ) {
	var wordCount = {};
	var words = wordString.trim().split(/\s+/);
	
	for (var i = 0; i < words.length; i++) {
		var word = words[i];
		wordCount[word] = (wordCount[word] || 0) + 1;
	}
	
	return wordCount;
};

export default Words;