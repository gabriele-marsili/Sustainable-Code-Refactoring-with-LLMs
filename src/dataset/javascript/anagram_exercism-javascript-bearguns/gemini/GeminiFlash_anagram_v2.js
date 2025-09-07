var Anagram = function(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split("").sort().join("");
}

Anagram.prototype.matches = function(candidates) {
  var results = [];

  if (Array.isArray(candidates)) {
    for (var i = 0; i < candidates.length; i++) {
      var candidate = candidates[i];
      if (this.isAnagram(candidate)) {
        results.push(candidate);
      }
    }
  } else if (arguments.length > 1) {
    for (var i = 0; i < arguments.length; i++) {
      var candidate = arguments[i];
       if (this.isAnagram(candidate)) {
        results.push(candidate);
      }
    }
  }
  else if (candidates !== undefined) {
    if (this.isAnagram(candidates)) {
      results.push(candidates);
    }
  }

  return results;
}

Anagram.prototype.isAnagram = function(candidate) {
  var candidateLower = candidate.toLowerCase();

  if (this.word === candidateLower) {
    return false;
  }

  if (this.word.length !== candidateLower.length) {
    return false;
  }

  var sortedCandidate = candidateLower.split("").sort().join("");

  return this.sortedWord === sortedCandidate;
}

export default Anagram;