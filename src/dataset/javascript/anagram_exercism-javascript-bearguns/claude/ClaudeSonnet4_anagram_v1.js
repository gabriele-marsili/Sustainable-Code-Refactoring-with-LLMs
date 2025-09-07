var Anagram = function(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split("").sort().join("");
}

Anagram.prototype.matches = function(match) {
  var self = this;
  var results = [];
  var candidates;

  if (arguments.length > 1) {
    candidates = Array.prototype.slice.call(arguments);
  } else if (typeof match === "object") {
    candidates = match;
  } else {
    candidates = [match];
  }

  for (var i = 0; i < candidates.length; i++) {
    if (self.isAnagram(candidates[i])) {
      results.push(candidates[i]);
    }
  }

  return results;
}

Anagram.prototype.isAnagram = function(match) {
  var matchLower = match.toLowerCase();
  
  if (this.word === matchLower || this.word.length !== matchLower.length) {
    return false;
  }

  return this.sortedWord === matchLower.split("").sort().join("");
}

export default Anagram;