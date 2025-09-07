const gcd = (num, denom) => {
    let a = Math.abs(num);
    let b = Math.abs(denom);
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a;
};

class Rational {
    constructor(num, denom) {
        if (denom === 0) throw new Error("Denominator cannot be zero");
        const divisor = gcd(num, denom) * Math.sign(denom);
        this.num = num / divisor;
        this.denom = denom / divisor;
    }

    add({ num, denom }) {
        return new Rational(
            this.num * denom + this.denom * num,
            this.denom * denom
        );
    }

    sub({ num, denom }) {
        return new Rational(
            this.num * denom - this.denom * num,
            this.denom * denom
        );
    }

    mul({ num, denom }) {
        return new Rational(this.num * num, this.denom * denom);
    }

    div({ num, denom }) {
        if (num === 0) throw new Error("Division by zero");
        return new Rational(this.num * denom, this.denom * num);
    }

    abs() {
        return new Rational(Math.abs(this.num), this.denom);
    }

    exprational(exp) {
        return new Rational(
            Math.sign(this.num) ** exp * Math.abs(this.num) ** exp,
            this.denom ** exp
        );
    }

    expreal(base) {
        return Math.pow(base, this.num / this.denom);
    }

    reduce() {
        return this; // Already reduced in constructor
    }
}

export default Rational;