var Pangram = function (input) {
  this.input = input;
  this.alphabet = "abcdefghijklmnopqrstuvwxyz";
  this.isPangram = function () {
    if (!this.input) return false;
    const str = this.input.toLowerCase();
    for (let i = 0; i < this.alphabet.length; i++) {
      if (!str.includes(this.alphabet[i])) {
        return false;
      }
    }
    return true;
  };
};

export default Pangram;