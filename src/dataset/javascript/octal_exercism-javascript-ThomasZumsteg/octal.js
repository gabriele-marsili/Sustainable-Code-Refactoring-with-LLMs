var Octal = function(oct) { 
    this.oct = oct;
    this._decimal = null;
}

Octal.prototype.toDecimal = function() {
    if (this._decimal !== null) return this._decimal;
    
    if (/[^0-7]/.test(this.oct)) {
        this._decimal = 0;
        return 0;
    }
    
    let result = 0;
    let power = 1;
    
    for (let i = this.oct.length - 1; i >= 0; i--) {
        result += parseInt(this.oct[i], 10) * power;
        power <<= 3;
    }
    
    this._decimal = result;
    return result;
};

export default Octal;