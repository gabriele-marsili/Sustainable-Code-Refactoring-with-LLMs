var Isogram = function(string) {
  this.string = string;
  this.isIsogram = function() {
    var seen = new Set();
    var cleanString = this.string.toLowerCase();
    
    for (var i = 0; i < cleanString.length; i++) {
      var char = cleanString[i];
      
      // Skip non-alphabetic characters
      if (char < 'a' || char > 'z') continue;
      
      if (seen.has(char)) {
        return false;
      }
      seen.add(char);
    }
    
    return true;
  }
};

export default Isogram;