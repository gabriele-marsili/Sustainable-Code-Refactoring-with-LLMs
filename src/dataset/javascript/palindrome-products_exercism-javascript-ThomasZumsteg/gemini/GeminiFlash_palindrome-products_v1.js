var Palindromes = function(args) {
    this.maxFactors = args.maxFactor;
    this.minFactor = args.minFactor || 1;
    this.palindromes = {};
};

Palindromes.prototype.generate = function() {
    if (this.generated) {
        return;
    }

    for (let i = this.minFactor; i <= this.maxFactors; i++) {
        for (let j = i; j <= this.maxFactors; j++) {
            const product = i * j;
            if (isPalindrome(product)) {
                if (!this.palindromes[product]) {
                    this.palindromes[product] = [];
                }
                this.palindromes[product].push([i, j]);
            }
        }
    }
    this.generated = true;
};

Palindromes.prototype.largest = function() {
    let largest = null;
    let largestValue = -1;

    for (const product in this.palindromes) {
        const num = parseInt(product);
        if (num > largestValue) {
            largestValue = num;
            largest = { value: num, factors: this.palindromes[product] };
        }
    }

    return largest;
};

Palindromes.prototype.smallest = function() {
    let smallest = null;
    let smallestValue = Infinity;

    for (const product in this.palindromes) {
        const num = parseInt(product);
        if (num < smallestValue) {
            smallestValue = num;
            smallest = { value: num, factors: this.palindromes[product] };
        }
    }

    return smallest;
};

function isPalindrome(num) {
    const str = num.toString();
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

export default Palindromes;