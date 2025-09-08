var Isogram = function(string) {
  this.string = string;
  this.isIsogram = function() {
    const cleanedString = this.string.toLowerCase().replace(/[\s-,\.]/g, '');
    const charSet = new Set();

    for (const char of cleanedString) {
      if (charSet.has(char)) {
        return false;
      }
      charSet.add(char);
    }

    return true;
  };
};

export default Isogram;