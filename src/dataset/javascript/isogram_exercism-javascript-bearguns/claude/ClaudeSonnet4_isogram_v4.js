var Isogram = function(string) {
  this.string = string;
  this.isIsogram = function() {
    var cleaned = this.string.toLowerCase().replace(/[\s-,\.]/g,'');
    var seen = new Set();
    
    for (var i = 0; i < cleaned.length; i++) {
      var char = cleaned[i];
      if (seen.has(char)) {
        return false;
      }
      seen.add(char);
    }
    
    return true;
  }
};

export default Isogram;