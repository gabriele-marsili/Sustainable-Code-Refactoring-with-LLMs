var Hexadecimal = function (hex_digits) {
    this.hex_digits = hex_digits;
};

Hexadecimal.prototype.toDecimal = function () {
    const hex_digits = this.hex_digits.toLowerCase();
    let total = 0;
    for (let i = 0, len = hex_digits.length; i < len; i++) {
        const digit = hex_digit_value(hex_digits[len - 1 - i]);
        if (isNaN(digit)) return 0;
        total += digit * (1 << (4 * i)); // Use bitwise shift for power of 16
    }
    return total;
};

function hex_digit_value(digit) {
    const code = digit.charCodeAt(0);
    return code >= 48 && code <= 57
        ? code - 48
        : code >= 97 && code <= 102
        ? code - 87
        : NaN;
}

export default Hexadecimal;