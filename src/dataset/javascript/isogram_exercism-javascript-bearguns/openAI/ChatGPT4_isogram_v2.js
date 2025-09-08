class Isogram {
  constructor(string) {
    this.string = string.toLowerCase().replace(/[\s-,\.]/g, '');
  }

  isIsogram() {
    const seen = new Set();
    for (const char of this.string) {
      if (seen.has(char)) {
        return false;
      }
      seen.add(char);
    }
    return true;
  }
}

export default Isogram;