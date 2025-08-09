var Pangram = function (input) {
  this.input = input;
  this.isPangram = function () {
    if (!this.input) return false;
    const seen = new Set();
    for (let char of this.input.toLowerCase()) {
      if (char >= 'a' && char <= 'z') {
        seen.add(char);
        if (seen.size === 26) return true;
      }
    }
    return false;
  }
}

export default Pangram;