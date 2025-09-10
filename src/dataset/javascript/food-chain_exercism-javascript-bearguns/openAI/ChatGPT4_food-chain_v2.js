class FoodChain {
  constructor() {
    this.animalenum = ["fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];
    this.animallines = {
      fly: { swallowed: "", why: "I don't know why she swallowed the fly. Perhaps she'll die." },
      spider: { swallowed: "It wriggled and jiggled and tickled inside her.", why: "She swallowed the spider to catch the fly." },
      bird: { swallowed: "How absurd to swallow a bird!", why: "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her." },
      cat: { swallowed: "Imagine that, to swallow a cat!", why: "She swallowed the cat to catch the bird." },
      dog: { swallowed: "What a hog, to swallow a dog!", why: "She swallowed the dog to catch the cat." },
      goat: { swallowed: "Just opened her throat and swallowed a goat!", why: "She swallowed the goat to catch the dog." },
      cow: { swallowed: "I don't know how she swallowed a cow!", why: "She swallowed the cow to catch the goat." },
      horse: { swallowed: "", why: "She's dead, of course!" }
    };
  }

  verse(num) {
    const animal = this.animalenum[num - 1];
    const { swallowed, why } = this.animallines[animal];
    let verse = `I know an old lady who swallowed a ${animal}.\n`;

    if (swallowed) verse += `${swallowed}\n`;
    verse += `${why}\n`;

    if (num > 1 && num < 8) {
      for (let i = num - 2; i >= 0; i--) {
        verse += `${this.animallines[this.animalenum[i]].why}\n`;
      }
    }

    return verse.trim();
  }

  verses(a, b) {
    const [start, end] = [Math.min(a, b), Math.max(a, b)];
    return Array.from({ length: end - start + 1 }, (_, i) => this.verse(start + i)).join("\n\n");
  }
}

export default FoodChain;