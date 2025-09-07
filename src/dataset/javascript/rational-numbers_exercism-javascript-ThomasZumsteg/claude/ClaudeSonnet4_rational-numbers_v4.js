const gcd = (num, denom) => {
    let a = Math.abs(num);
    let b = Math.abs(denom);
    if (a < b) [a, b] = [b, a];
    
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
};

class Rational {
    constructor(num, denom) {
        if (denom === 0) throw new Error("Denominator cannot be zero");
        
        const divisor = gcd(num, denom);
        const sign = (num < 0) !== (denom < 0) ? -1 : 1;
        
        this.num = sign * Math.abs(num) / divisor;
        this.denom = Math.abs(denom) / divisor;
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