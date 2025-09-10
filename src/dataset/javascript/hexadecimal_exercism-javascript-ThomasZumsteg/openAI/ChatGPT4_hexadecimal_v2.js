class Hexadecimal {
    constructor(hex_digits) {
        this.hex_digits = hex_digits;
    }

    toDecimal() {
        let total = 0;
        for (let i = 0; i < this.hex_digits.length; i++) {
            const digit = hex_digit_value(this.hex_digits[this.hex_digits.length - 1 - i]);
            if (isNaN(digit)) return 0;
            total += digit * (1 << (4 * i)); // Use bitwise shift for power of 16
        }
        return total;
    }
}

function hex_digit_value(digit) {
    const code = digit.charCodeAt(0);
    if (code >= 48 && code <= 57) return code - 48; // '0'-'9'
    if (code >= 97 && code <= 102) return code - 87; // 'a'-'f'
    return NaN;
}

export default Hexadecimal;