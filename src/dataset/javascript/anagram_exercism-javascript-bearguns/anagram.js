var Anagram = function(word) {
  this.word = word.toLowerCase();
  this.sortedWord = this.word.split("").sort().join("");
}

Anagram.prototype.matches = function(match) {
  var results = [];
  var candidates = Array.isArray(match) ? match : 
                   arguments.length > 1 ? Array.prototype.slice.call(arguments) : [match];
  
  for (var i = 0; i < candidates.length; i++) {
    if (this.isAnagram(candidates[i])) {
      results.push(candidates[i]);
    }
  }
  
  return results;
}

Anagram.prototype.isAnagram = function(match) {
  var lowerMatch = match.toLowerCase();
  
  if (this.word === lowerMatch || this.word.length !== lowerMatch.length) {
    return false;
  }
  
  return this.sortedWord === lowerMatch.split("").sort().join("");
}

export default Anagram;