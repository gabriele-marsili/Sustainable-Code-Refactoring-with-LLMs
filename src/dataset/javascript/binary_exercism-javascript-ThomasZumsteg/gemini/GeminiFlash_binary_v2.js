var Binary = function(binString) { this.binString = binString; };

Binary.prototype.toDecimal = function() {
    if (!/^[01]+$/.test(this.binString)) {
        return 0;
    }

    let decimal = 0;
    let len = this.binString.length;

    for (let i = 0; i < len; i++) {
        decimal = (decimal * 2) + parseInt(this.binString[i], 10);
    }

    return decimal;
};

export default Binary;