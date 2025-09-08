var Isogram = function(string) {
  this.string = string;
  this.isIsogram = function() {
    const cleanedString = this.string.toLowerCase().replace(/[\s-,\.]/g, '');
    const seen = new Set();

    for (const char of cleanedString) {
      if (seen.has(char)) {
        return false;
      }
      seen.add(char);
    }

    return true;
  };
};

export default Isogram;