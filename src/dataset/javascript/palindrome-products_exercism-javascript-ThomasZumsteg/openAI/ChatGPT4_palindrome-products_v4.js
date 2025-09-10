var Palindromes = function (args) {
    this.maxFactors = args['maxFactor'];
    this.minFactor = args['minFactor'] || 1;
    this.palindromes = null;
};

Palindromes.prototype.generate = function () {
    if (this.palindromes) return;
    this.palindromes = new Map();
    for (let i = this.minFactor; i <= this.maxFactors; i++) {
        for (let j = i; j <= this.maxFactors; j++) {
            const product = i * j;
            if (isPalindrome(product)) {
                if (!this.palindromes.has(product)) {
                    this.palindromes.set(product, []);
                }
                this.palindromes.get(product).push([i, j]);
            }
        }
    }
};

Palindromes.prototype.largest = function () {
    const max = Math.max(...this.palindromes.keys());
    return { value: max, factors: this.palindromes.get(max) };
};

Palindromes.prototype.smallest = function () {
    const min = Math.min(...this.palindromes.keys());
    return { value: min, factors: this.palindromes.get(min) };
};

function isPalindrome(num) {
    const str = num.toString();
    const len = str.length;
    for (let i = 0; i < len >> 1; i++) {
        if (str[i] !== str[len - i - 1]) return false;
    }
    return true;
}

export default Palindromes;