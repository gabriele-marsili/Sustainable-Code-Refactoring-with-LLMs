Pangram = function(text) {
    this.text = text;
}

Pangram.prototype.alphabet = "abcdefghijklmnopqrstuvwxyz";

Pangram.prototype.isPangram = function() {
    const seen = new Set();
    for (let i = 0; i < this.text.length; i++) {
        const char = this.text[i].toLowerCase();
        if (char >= 'a' && char <= 'z') {
            seen.add(char);
            if (seen.size === 26) return true;
        }
    }
    return false;
}

export default Pangram;