var anagram = function(word) { return new Anagram(word); };

function Anagram(word) { 
    this.word = word.toLowerCase();
    this.sortedLetters = this.word.split('').sort().join('');
}

Anagram.prototype.matches = function(wordList) {
    if (!(wordList instanceof Array)) {
        wordList = Array.from(arguments);
    }
    
    const targetLetters = this.sortedLetters;
    const targetWord = this.word;
    
    return wordList.filter(word => {
        const lowerWord = word.toLowerCase();
        return lowerWord !== targetWord && 
               lowerWord.split('').sort().join('') === targetLetters;
    });
};

export default anagram;