var Pangram = function (input) {
  this.input = input;
  this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  this.isPangram = function () {
    if (!this.input) return false;
    const seen = new Set();
    for (let i = 0; i < this.input.length; i++) {
      const char = this.input[i].toLowerCase();
      if (char >= 'a' && char <= 'z') {
        seen.add(char);
        if (seen.size === 26) return true;
      }
    }
    return false;
  };
};

export default Pangram;