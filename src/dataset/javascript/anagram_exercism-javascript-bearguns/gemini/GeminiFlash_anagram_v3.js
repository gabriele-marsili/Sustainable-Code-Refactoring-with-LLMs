var Anagram = function(word) {
  this.word = word;
  this.sortedWord = word.toLowerCase().split("").sort().join("");
  this.lowerWord = word.toLowerCase();
};

Anagram.prototype.matches = function(match) {
  var self = this;
  var results = [];
  var matches;

  if (arguments.length > 1) {
    matches = Array.prototype.slice.call(arguments);
  }
  else if (typeof match === "object" && match !== null) {
    matches = match;
  }
  else {
    matches = [match];
  }

  if (!Array.isArray(matches)) {
    return results;
  }

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    if (self.isAnagram(m)) {
      results.push(m);
    }
  }
  return results;
};

Anagram.prototype.isAnagram = function(match) {
  const lowerMatch = match.toLowerCase();

  if (this.lowerWord === lowerMatch) {
    return false;
  }

  if (this.lowerWord.length !== lowerMatch.length) {
    return false;
  }

  const sortedMatch = lowerMatch.split("").sort().join("");

  return this.sortedWord === sortedMatch;
};

export default Anagram;