var anagram = function( word ) { return new Anagram(word); };

function Anagram(word) { this.word = word.toLowerCase(); this.sortedWord = this.word.split('').sort().join(''); };

Anagram.prototype.matches = function( wordList) {
	if(!Array.isArray(wordList)) {
		wordList = Array.prototype.slice.call(arguments);
	}

	const anagram = this.word;
	const sortedWord = this.sortedWord;

	return wordList.filter(word => {
		const lowerCaseWord = word.toLowerCase();
		if (lowerCaseWord === anagram) return false;

		const sortedInputWord = lowerCaseWord.split('').sort().join('');
		return sortedInputWord === sortedWord;
	});
};

export default anagram;