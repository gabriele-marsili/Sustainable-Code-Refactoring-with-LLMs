/* Octal number class */
var Octal = function(oct) { this.oct = oct; };

Octal.prototype.toDecimal = function() {
    /* Converts octal to decimal */
    if (/[^0-7]/.test(this.oct)) {
        return 0;
    }

    let decimal = 0;
    const octalString = this.oct;
    const len = octalString.length;

    for (let i = 0; i < len; i++) {
        const digit = parseInt(octalString[len - 1 - i], 10);
        decimal += digit * (8 ** i);
    }

    return decimal;
};

export default Octal;