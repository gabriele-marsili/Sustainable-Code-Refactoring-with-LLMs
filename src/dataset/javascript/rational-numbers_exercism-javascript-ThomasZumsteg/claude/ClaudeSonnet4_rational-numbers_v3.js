const gcd = (num, denom) => {
    let a = Math.abs(num);
    let b = Math.abs(denom);
    
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
        const newNum = this.num * rational.denom + this.denom * rational.num;
        const newDenom = this.denom * rational.denom;
        return new Rational(newNum, newDenom);
    }

    sub(rational) {
        const newNum = this.num * rational.denom - this.denom * rational.num;
        const newDenom = this.denom * rational.denom;
        return new Rational(newNum, newDenom);
    }

    mul(rational) {
        return new Rational(this.num * rational.num, this.denom * rational.denom);
    }

    div(rational) {
        if (rational.num === 0) throw new Error("Cannot divide by zero");
        return new Rational(this.num * rational.denom, this.denom * rational.num);
    }

    abs() {
        return new Rational(Math.abs(this.num), this.denom);
    }

    exprational(exp) {
        if (exp === 0) return new Rational(1, 1);
        if (exp === 1) return new Rational(this.num, this.denom);
        
        const isNegativeExp = exp < 0;
        const absExp = Math.abs(exp);
        
        const newNum = Math.pow(isNegativeExp ? this.denom : this.num, absExp);
        const newDenom = Math.pow(isNegativeExp ? this.num : this.denom, absExp);
        
        return new Rational(newNum, newDenom);
    }

    expreal(base) {
        return Math.pow(base, this.num / this.denom);
    }

    reduce() {
        return this;
    }
}

export default Rational;