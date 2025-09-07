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
        const divisor = gcd(num, denom) * (num < 0 ? -1 : 1);
        this.num = num / divisor;
        this.denom = denom / divisor * (num === 0 && denom < 0 ? -1 : 1);
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
        return new Rational(this.num * denom, this.denom * num);
    }

    abs() {
        return new Rational(Math.abs(this.num), Math.abs(this.denom));
    }

    exprational(exp) {
        return new Rational(this.num ** exp, this.denom ** exp);
    }

    expreal(base) {
        return base ** (this.num / this.denom);
    }

    reduce() {
        return this;
    }
}

export default Rational;