var gcd = function(num, denom) {
    var a = Math.abs(num);
    var b = Math.abs(denom);
    if (a < b) {
        var temp = a;
        a = b;
        b = temp;
    }
    while (b !== 0) {
        var remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}

class Rational {
    constructor(num, denom) {
        if (denom === 0) throw new Error("Denominator cannot be zero");
        
        var divisor = gcd(num, denom);
        if (denom < 0) divisor = -divisor;
        
        this.num = num / divisor;
        this.denom = denom / divisor;
    }

    add(rational) {
        return new Rational(
            this.num * rational.denom + this.denom * rational.num,
            this.denom * rational.denom);
    }

    sub(rational) {
        return new Rational(
            this.num * rational.denom - this.denom * rational.num,
            this.denom * rational.denom);
    }

    mul(rational) {
        return new Rational(this.num * rational.num, this.denom * rational.denom);
    }

    div(rational) {
        return new Rational(this.num * rational.denom, this.denom * rational.num);
    }

    abs() {
        return new Rational(Math.abs(this.num), this.denom);
    }

    exprational(exp) {
        return new Rational(Math.pow(this.num, exp), Math.pow(this.denom, exp));
    }

    expreal(base) {
        return Math.pow(base, this.num / this.denom);
    }

    reduce() {
        return this;
    }
}

export default Rational;