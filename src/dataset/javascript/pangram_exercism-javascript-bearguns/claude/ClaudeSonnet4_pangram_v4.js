var Pangram = function (input) {
  this.input = input;
  this.isPangram = function () {
    if (!this.input) return false;
    
    const seen = new Set();
    const str = this.input.toLowerCase();
    
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char >= 'a' && char <= 'z') {
        seen.add(char);
        if (seen.size === 26) return true;
      }
    }
    
    return false;
  }
}

export default Pangram;