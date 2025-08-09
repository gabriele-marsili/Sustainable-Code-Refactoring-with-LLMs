var Pangram = function (input) {
  this.input = input;
  this.isPangram = function () {
    if (!this.input) return false;
    
    var seen = 0;
    var str = this.input.toLowerCase();
    
    for (var i = 0; i < str.length; i++) {
      var charCode = str.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) {
        seen |= 1 << (charCode - 97);
        if (seen === 67108863) return true; // 2^26 - 1
      }
    }
    
    return false;
  }
}

export default Pangram;