var Octal = function(oct) { 
    this.oct = oct;
    this._isValid = /^[0-7]*$/.test(oct);
    this._decimal = null;
}

Octal.prototype.toDecimal = function() {
    if (!this._isValid) return 0;
    
    if (this._decimal !== null) return this._decimal;
    
    let result = 0;
    let power = 1;
    
    for (let i = this.oct.length - 1; i >= 0; i--) {
        result += (this.oct.charCodeAt(i) - 48) * power;
        power <<= 3;
    }
    
    this._decimal = result;
    return result;
};

export default Octal;