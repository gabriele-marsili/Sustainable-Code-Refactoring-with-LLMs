var Anagram = function(word) {
  this.word = word;
  this.lowerWord = word.toLowerCase();
  this.sortedWord = this.lowerWord.split("").sort().join("");
};

Anagram.prototype.matches = function(match) {
  var results = [];
  var matches;

  if (arguments.length > 1) {
    matches = Array.prototype.slice.call(arguments);
  } else if (typeof match === "object" && match !== null) {
    matches = match;
  } else {
    matches = [match];
  }

  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    if (this.isAnagram(m)) {
      results.push(m);
    }
  }

  return results;
};

Anagram.prototype.isAnagram = function(match) {
  var lowerMatch = match.toLowerCase();

  if (this.lowerWord === lowerMatch) {
    return false;
  }

  if (this.sortedWord.length !== lowerMatch.length) {
    return false;
  }

  var sortedMatch = lowerMatch.split("").sort().join("");

  return this.sortedWord === sortedMatch;
};

export default Anagram;