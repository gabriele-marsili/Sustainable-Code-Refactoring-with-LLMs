var gcd = function(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    if (b > a) {
        [a, b] = [b, a];
    }

    while (b) {
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

        if (divisor !== 1) {
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
        return new Rational(
            this.num * rational.denom + this.denom * rational.num,
            this.denom * rational.denom
        );
    }

    sub(rational) {
        return new Rational(
            this.num * rational.denom - this.denom * rational.num,
            this.denom * rational.denom
        );
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