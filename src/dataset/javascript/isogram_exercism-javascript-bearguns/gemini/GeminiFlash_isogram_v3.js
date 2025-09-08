var Isogram = function(string) {
  this.string = string;
  this.isIsogram = function() {
    const cleanedString = this.string.toLowerCase().replace(/[\s-,\.]/g, '');
    if (cleanedString.length === 0) return true;

    const charSet = new Set();
    for (let i = 0; i < cleanedString.length; i++) {
      const char = cleanedString[i];
      if (charSet.has(char)) {
        return false;
      }
      charSet.add(char);
    }
    return true;
  }
};

export default Isogram;