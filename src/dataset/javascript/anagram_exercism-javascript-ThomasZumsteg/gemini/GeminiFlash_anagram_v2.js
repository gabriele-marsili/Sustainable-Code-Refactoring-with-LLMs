var anagram = function( word ) { return new Anagram(word); };

/* Class for finding anagrams */
function Anagram(word) { this.word = word.toLowerCase(); this.sortedWord = this.word.split('').sort().join(''); };

Anagram.prototype.matches = function( wordList) {
	/* Finds all anagrams of the word */
	if(!Array.isArray(wordList)) {
		// If the arguments aren't in list form
		wordList = Array.from(arguments);
	}

	const anagram = this.word;
	const sortedWord = this.sortedWord;

	return wordList.filter(word => {
		const lowerCaseWord = word.toLowerCase();
		if (lowerCaseWord === anagram) return false;
		return lowerCaseWord.split('').sort().join('') === sortedWord;
	});
};

export default anagram;