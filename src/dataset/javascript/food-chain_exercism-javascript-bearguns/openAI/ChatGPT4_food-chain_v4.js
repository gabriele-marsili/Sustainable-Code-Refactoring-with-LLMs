class FoodChain {
  constructor() {
    this.animalenum = ["fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];
    this.animallines = {
      "fly": { swallowed: "", why: "\nI don't know why she swallowed the fly. Perhaps she'll die.\n" },
      "spider": { swallowed: "\nIt wriggled and jiggled and tickled inside her.", why: "\nShe swallowed the spider to catch the fly." },
      "bird": { swallowed: "\nHow absurd to swallow a bird!", why: "\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her." },
      "cat": { swallowed: "\nImagine that, to swallow a cat!", why: "\nShe swallowed the cat to catch the bird." },
      "dog": { swallowed: "\nWhat a hog, to swallow a dog!", why: "\nShe swallowed the dog to catch the cat." },
      "goat": { swallowed: "\nJust opened her throat and swallowed a goat!", why: "\nShe swallowed the goat to catch the dog." },
      "cow": { swallowed: "\nI don't know how she swallowed a cow!", why: "\nShe swallowed the cow to catch the goat." },
      "horse": { swallowed: "", why: "\nShe's dead, of course!\n" }
    };
  }

  verse(num) {
    const animal = this.animalenum[num - 1];
    const { swallowed, why } = this.animallines[animal];
    let verse = `I know an old lady who swallowed a ${animal}.`;
    verse += swallowed + why;

    if (num > 1 && num < 8) {
      for (let i = num - 2; i >= 0; i--) {
        const nextAnimal = this.animalenum[i];
        verse += this.animallines[nextAnimal].why;
      }
    }

    return verse;
  }

  verses(a, b) {
    const [start, end] = [Math.min(a, b), Math.max(a, b)];
    return Array.from({ length: end - start + 1 }, (_, i) => this.verse(start + i)).join("\n") + "\n";
  }
}

export default FoodChain;