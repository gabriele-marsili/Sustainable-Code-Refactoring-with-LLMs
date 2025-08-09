var Pangram = function (input) {
  this.input = input;
  this.isPangram = function () {
    if (!this.input) return false;
    
    var str = this.input.toLowerCase();
    var seen = new Set();
    
    for (var i = 0; i < str.length; i++) {
      var char = str[i];
      if (char >= 'a' && char <= 'z') {
        seen.add(char);
        if (seen.size === 26) return true;
      }
    }
    
    return seen.size === 26;
  }
}

export default Pangram;