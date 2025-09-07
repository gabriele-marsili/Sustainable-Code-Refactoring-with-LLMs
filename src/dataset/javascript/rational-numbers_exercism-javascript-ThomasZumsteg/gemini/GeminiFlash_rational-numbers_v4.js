var gcd = function(num, denom) {
    let a = Math.abs(num);
    let b = Math.abs(denom);

    if (b > a) {
        [a, b] = [b, a];
    }

    while (b !== 0) {
        a %= b;
        [a, b] = [b, a];
    }
    return a;
}

class Rational {
    constructor(num, denom) {
        if (denom === 0) {
            throw new Error("Denominator cannot be zero.");
        }

        let divisor = gcd(num, denom);

        if (divisor !== 0) {
            num /= divisor;
            denom /= divisor;
        }

        if (denom < 0) {
            num = -num;
            denom = -denom;
        }

        this.num = num;
        this.denom = denom;
    }

    add(rational) {
        const num = this.num * rational.denom + this.denom * rational.num;
        const denom = this.denom * rational.denom;
        return new Rational(num, denom);
    }

    sub(rational) {
        const num = this.num * rational.denom - this.denom * rational.num;
        const denom = this.denom * rational.denom;
        return new Rational(num, denom);
    }

    mul(rational) {
        return new Rational(this.num * rational.num, this.denom * rational.denom);
    }

    div(rational) {
        if (rational.num === 0) {
            throw new Error("Cannot divide by zero.");
        }
        return new Rational(this.num * rational.denom, this.denom * rational.num);
    }

    abs() {
        return new Rational(Math.abs(this.num), Math.abs(this.denom));
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