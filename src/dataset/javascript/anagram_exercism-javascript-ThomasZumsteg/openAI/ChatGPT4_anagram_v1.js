var anagram = function(word) {
  return new Anagram(word);
};

/* Class for finding anagrams */
function Anagram(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split('').sort().join('');
}

Anagram.prototype.matches = function(wordList) {
  if (!Array.isArray(wordList)) {
    wordList = Array.from(arguments);
  }
  const anagram = this.word;
  const sortedWord = this.sortedWord;

  return wordList.filter(word => {
    const lowerWord = word.toLowerCase();
    return lowerWord !== anagram && lowerWord.split('').sort().join('') === sortedWord;
  });
};

export default anagram;