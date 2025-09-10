var Hexadecimal = function (hex_digits) {
    /* Hexadecimal number class */
    this.hex_digits = hex_digits;
};

Hexadecimal.prototype.toDecimal = function () {
    /* Converts hexadecimal to decimal */
    let total = 0;
    for (let i = 0, len = this.hex_digits.length; i < len; i++) {
        const digit = hex_digit_value(this.hex_digits[len - 1 - i]);
        if (isNaN(digit)) return 0;
        total += digit * (1 << (4 * i)); // Use bitwise shift for power of 16
    }
    return total;
};

function hex_digit_value(digit) {
    /* Converts a hexadecimal digit to integer or NaN */
    if (digit >= '0' && digit <= '9') return digit.charCodeAt(0) - 48; // '0'.charCodeAt(0) === 48
    if (digit >= 'a' && digit <= 'f') return digit.charCodeAt(0) - 87; // 'a'.charCodeAt(0) === 97
    return NaN;
}

export default Hexadecimal;