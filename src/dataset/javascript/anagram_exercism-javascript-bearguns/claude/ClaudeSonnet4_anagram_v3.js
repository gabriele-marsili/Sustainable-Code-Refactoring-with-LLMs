var Anagram = function(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split("").sort().join("");
}

Anagram.prototype.matches = function(match) {
  var candidates = Array.isArray(match) ? match : 
                   arguments.length > 1 ? Array.prototype.slice.call(arguments) : [match];
  
  var results = [];
  var base = this.word;
  var baseSorted = this.sortedWord;
  
  for (var i = 0; i < candidates.length; i++) {
    var candidate = candidates[i];
    if (this.isAnagram(base, candidate, baseSorted)) {
      results.push(candidate);
    }
  }
  
  return results;
}

Anagram.prototype.isAnagram = function(base, match, baseSorted) {
  var matchLower = match.toLowerCase();
  
  if (base === matchLower || base.length !== matchLower.length) {
    return false;
  }
  
  var sortedMatch = matchLower.split("").sort().join("");
  return (baseSorted || this.sortedWord) === sortedMatch;
}

export default Anagram;