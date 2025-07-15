Pangram = function(text) {
    this.text = text
}

Pangram.prototype.alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

Pangram.prototype.isPangram = function() {
    var letters = this.text.toLowerCase();
    return this.alphabet.every((letter) => letters.includes(letter));
}

export default Pangram;
