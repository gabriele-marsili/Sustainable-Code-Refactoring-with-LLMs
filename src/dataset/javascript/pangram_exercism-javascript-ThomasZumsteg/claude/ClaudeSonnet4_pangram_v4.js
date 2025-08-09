Pangram = function(text) {
    this.text = text;
    this._letterSet = null;
}

Pangram.prototype.isPangram = function() {
    if (!this._letterSet) {
        this._letterSet = new Set(this.text.toLowerCase().match(/[a-z]/g) || []);
    }
    return this._letterSet.size === 26;
}

export default Pangram;