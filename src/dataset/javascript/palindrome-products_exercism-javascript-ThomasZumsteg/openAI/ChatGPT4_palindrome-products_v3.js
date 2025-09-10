class Palindromes {
  constructor(args) {
    this.maxFactors = args['maxFactor'];
    this.minFactor = args['minFactor'] || 1;
    this.palindromes = null;
  }

  generate() {
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
  }

  largest() {
    const max = Math.max(...this.palindromes.keys());
    return { value: max, factors: this.palindromes.get(max) };
  }

  smallest() {
    const min = Math.min(...this.palindromes.keys());
    return { value: min, factors: this.palindromes.get(min) };
  }
}

function isPalindrome(num) {
  const str = num.toString();
  const len = str.length;
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) return false;
  }
  return true;
}

export default Palindromes;