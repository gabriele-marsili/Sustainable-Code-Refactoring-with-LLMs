Pangram = function(text) {
    this.text = text.toLowerCase();
}

Pangram.prototype.isPangram = function() {
    const seen = new Set();
    
    for (let i = 0; i < this.text.length; i++) {
        const char = this.text[i];
        if (char >= 'a' && char <= 'z') {
            seen.add(char);
            if (seen.size === 26) {
                return true;
            }
        }
    }
    
    return seen.size === 26;
}

export default Pangram;