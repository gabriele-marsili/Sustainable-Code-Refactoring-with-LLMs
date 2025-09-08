class Isogram {
  constructor(word) {
    this.word = word;
  }

  isIsogram() {
    const cleanWord = this.word.toLowerCase().replace(/[-\s]/g, '');
    const letters = new Set();

    for (let i = 0; i < cleanWord.length; i++) {
      const char = cleanWord[i];
      if (letters.has(char)) {
        return false;
      }
      letters.add(char);
    }

    return true;
  }
}

export default Isogram;