var anagram = function( word ) { return new Anagram(word); };

/* Class for finding anagrams */
function Anagram(word) { 
    this.word = word.toLowerCase();
    this.sortedLetters = this.word.split('').sort().join('');
};

Anagram.prototype.matches = function( wordList) {
    /* Finds all anagrams of the word */
    if(! (wordList instanceof Array)) {
        // If the arguments aren't in list form
        wordList = Array.prototype.slice.call(arguments);
    }
    
    var sortedLetters = this.sortedLetters;
    var originalWord = this.word;
    
    return wordList.filter(function(word) {
        var lowerWord = word.toLowerCase();
        return lowerWord !== originalWord && 
               lowerWord.split('').sort().join('') === sortedLetters;
    });
};

export default anagram;