var Trinary = function(digits) {
    /* Trinary number class */
    this.digits = digits;
};

Trinary.prototype.toDecimal = function() {
    /* Converts trinary number to decimal */
    let decimal = 0;
    for (let i = 0, len = this.digits.length; i < len; i++) {
        const digit = this.digits[len - 1 - i];
        if (digit >= '0' && digit <= '2') {
            decimal += digit * 3 ** i;
        } else {
            return 0;
        }
    }
    return decimal;
};

export default Trinary;