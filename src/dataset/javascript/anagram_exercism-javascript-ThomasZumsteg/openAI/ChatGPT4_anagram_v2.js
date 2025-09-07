const anagram = (word) => new Anagram(word);

/* Class for finding anagrams */
class Anagram {
  constructor(word) {
    this.word = word.toLowerCase();
    this.sortedWord = this._sortLetters(this.word);
  }

  _sortLetters(word) {
    return word.split('').sort().join('');
  }

  matches(wordList) {
    if (!Array.isArray(wordList)) {
      wordList = Array.from(arguments);
    }
    return wordList.filter((word) => {
      const lowerWord = word.toLowerCase();
      return lowerWord !== this.word && this._sortLetters(lowerWord) === this.sortedWord;
    });
  }
}

export default anagram;