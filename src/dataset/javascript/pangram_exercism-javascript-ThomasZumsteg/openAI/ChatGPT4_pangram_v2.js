Pangram = function(text) {
    this.text = text;
}

Pangram.prototype.isPangram = function() {
    const seen = new Set();
    for (let i = 0; i < this.text.length; i++) {
        const code = this.text.charCodeAt(i) | 32;
        if (code >= 97 && code <= 122) {
            seen.add(code);
            if (seen.size === 26) return true;
        }
    }
    return false;
}

export default Pangram;