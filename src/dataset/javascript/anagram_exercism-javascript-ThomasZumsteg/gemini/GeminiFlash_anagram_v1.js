var anagram = function( word ) { return new Anagram(word); };

/* Class for finding anagrams */
function Anagram(word) { this.word = word.toLowerCase(); this.sortedWord = this.word.split('').sort().join(''); };

Anagram.prototype.matches = function( wordList) {
	/* Finds all anagrams of the word */
	var list = Array.isArray(wordList) ? wordList : Array.from(arguments);
	var anagram = this.word;
	var sortedWord = this.sortedWord;

	return list.filter(function(word) {
		var lowerCaseWord = word.toLowerCase();
		if (lowerCaseWord === anagram) return false;
		return lowerCaseWord.split('').sort().join('') === sortedWord;
	});
};

export default anagram;