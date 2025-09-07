class Anagram {
  constructor(word) {
    this.word = word.toLowerCase();
    this.sortedWord = this.word.split("").sort().join("");
  }

  matches(...args) {
    const candidates = Array.isArray(args[0]) ? args[0] : args;
    return candidates.filter(candidate => this.isAnagram(candidate));
  }

  isAnagram(candidate) {
    const lowerCandidate = candidate.toLowerCase();
    if (this.word === lowerCandidate) return false;
    return this.sortedWord === lowerCandidate.split("").sort().join("");
  }
}

export default Anagram;