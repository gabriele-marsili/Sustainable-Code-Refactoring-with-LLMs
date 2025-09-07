class Anagram {
  constructor(word) {
    this.word = word.toLowerCase();
    this.sortedWord = this.word.split("").sort().join("");
  }

  matches(...args) {
    const matches = Array.isArray(args[0]) ? args[0] : args;
    return matches.filter((match) => this.isAnagram(match));
  }

  isAnagram(match) {
    const lowerMatch = match.toLowerCase();
    if (this.word === lowerMatch || this.word.length !== lowerMatch.length) {
      return false;
    }
    return this.sortedWord === lowerMatch.split("").sort().join("");
  }
}

export default Anagram;