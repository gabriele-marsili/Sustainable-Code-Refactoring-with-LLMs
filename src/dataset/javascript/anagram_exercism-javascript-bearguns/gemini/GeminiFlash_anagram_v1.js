var Anagram = function(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split("").sort().join("");
}

Anagram.prototype.matches = function(match) {
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
      return [];
  }

  for (var i = 0; i < matches.length; i++) {
    var m = matches[i];
    if (typeof m === 'string' && this.isAnagram(m)) {
      results.push(m);
    }
  }
  return results;
}

Anagram.prototype.isAnagram = function(match) {
  var matchLower = match.toLowerCase();

  if (this.word === matchLower) {
    return false;
  }

  if (this.word.length !== matchLower.length) {
    return false;
  }

  var sortedMatch = matchLower.split("").sort().join("");

  return this.sortedWord === sortedMatch;
}

export default Anagram;