class FoodChain {
  constructor() {
    this.opening = "I know an old lady who swallowed ";
    this.first = [
      "",
      "a fly.\n",
      "a spider.\nIt wriggled and jiggled and tickled inside her.\n",
      "a bird.\nHow absurd to swallow a bird!\n",
      "a cat.\nImagine that, to swallow a cat!\n",
      "a dog.\nWhat a hog, to swallow a dog!\n",
      "a goat.\nJust opened her throat and swallowed a goat!\n",
      "a cow.\nI don't know how she swallowed a cow!\n",
      "a horse.\nShe's dead, of course!\n",
    ];
    this.chorus = [
      "I don't know why she swallowed the fly. Perhaps she'll die.\n",
      "She swallowed the spider to catch the fly.\n",
      "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n",
      "She swallowed the cat to catch the bird.\n",
      "She swallowed the dog to catch the cat.\n",
      "She swallowed the goat to catch the dog.\n",
      "She swallowed the cow to catch the goat.\n",
    ];
  }

  verse(verseNum) {
    const verse = this.opening + this.first[verseNum];
    if (verseNum >= 8) return verse;
    
    let chorusText = '';
    for (let i = verseNum - 1; i >= 0; i--) {
      chorusText += this.chorus[i];
    }
    return verse + chorusText;
  }

  verses(stop, start) {
    const verses = [];
    for (let i = stop; i <= start; i++) {
      verses.push(this.verse(i));
    }
    return verses.join('\n') + '\n';
  }
}

export default FoodChain;