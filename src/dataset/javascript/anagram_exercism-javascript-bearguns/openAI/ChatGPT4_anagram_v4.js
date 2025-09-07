var Anagram = function(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split("").sort().join("");
}

Anagram.prototype.matches = function(match) {
  const matches = Array.isArray(match) ? match : Array.from(arguments);
  return matches.filter(m => this.isAnagram(m));
}

Anagram.prototype.isAnagram = function(match) {
  const lowerMatch = match.toLowerCase();
  if (this.word === lowerMatch || this.word.length !== lowerMatch.length) {
    return false;
  }
  return this.sortedWord === lowerMatch.split("").sort().join("");
}

export default Anagram;