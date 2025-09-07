var anagram = function (word) {
  return new Anagram(word);
};

function Anagram(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split('').sort().join('');
}

Anagram.prototype.matches = function (wordList) {
  if (!Array.isArray(wordList)) {
    wordList = Array.from(arguments);
  }
  const originalWord = this.word;
  const sortedWord = this.sortedWord;
  return wordList.filter(
    (word) =>
      word.toLowerCase() !== originalWord &&
      word.toLowerCase().split('').sort().join('') === sortedWord
  );
};

export default anagram;