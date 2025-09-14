class Palindromes {
  constructor(args) {
    this.maxFactors = args['maxFactor'];
    this.minFactor = args['minFactor'] || 1;
    this.palindromes = null;
    this._largest = null;
    this._smallest = null;
  }

  generate() {
    if (this.palindromes) return;
    
    this.palindromes = new Map();
    let minPalindrome = Infinity;
    let maxPalindrome = -Infinity;
    
    for (let i = this.minFactor; i <= this.maxFactors; i++) {
      for (let j = i; j <= this.maxFactors; j++) {
        const product = i * j;
        
        if (this._isPalindrome(product)) {
          if (!this.palindromes.has(product)) {
            this.palindromes.set(product, []);
          }
          this.palindromes.get(product).push([i, j]);
          
          if (product < minPalindrome) {
            minPalindrome = product;
            this._smallest = { value: product, factors: this.palindromes.get(product) };
          }
          if (product > maxPalindrome) {
            maxPalindrome = product;
            this._largest = { value: product, factors: this.palindromes.get(product) };
          }
        }
      }
    }
    
    this.palindromes = Object.fromEntries(this.palindromes);
  }

  largest() {
    return { 
      value: this._largest.value, 
      factors: this.palindromes[this._largest.value] 
    };
  }

  smallest() {
    return { 
      value: this._smallest.value, 
      factors: this.palindromes[this._smallest.value] 
    };
  }

  _isPalindrome(num) {
    const str = num.toString();
    const len = str.length;
    const halfLen = len >> 1;
    
    for (let i = 0; i < halfLen; i++) {
      if (str[i] !== str[len - 1 - i]) {
        return false;
      }
    }
    return true;
  }
}

function is_palindrome(str) {
  const len = str.length;
  const halfLen = len >> 1;
  
  for (let i = 0; i < halfLen; i++) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }
  return true;
}

export default Palindromes;