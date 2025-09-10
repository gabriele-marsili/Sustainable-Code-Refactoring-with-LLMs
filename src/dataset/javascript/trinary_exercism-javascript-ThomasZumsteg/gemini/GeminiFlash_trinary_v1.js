var Trinary = function(digits) {
    this.digits = digits;
};

Trinary.prototype.toDecimal = function() {
    let decimal = 0;
    const digits = this.digits;
    const len = digits.length;

    for (let i = len - 1, power = 0; i >= 0; i--, power++) {
        const digit = digits[i];
        if (digit >= '0' && digit <= '2') {
            decimal += digit * (3 ** power);
        } else {
            return 0;
        }
    }

    return decimal;
};

export default Trinary;