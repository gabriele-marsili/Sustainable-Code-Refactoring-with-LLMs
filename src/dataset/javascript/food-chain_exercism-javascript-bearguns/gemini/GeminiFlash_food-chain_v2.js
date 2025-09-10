var FoodChain = function() {
  this.animalenum = ["fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];
  this.animallines = {
    "fly": { swallowed: null,  why: "\nI don't know why she swallowed the fly. Perhaps she'll die.\n" },
    "spider": { swallowed: "\nIt wriggled and jiggled and tickled inside her.", why: "\nShe swallowed the spider to catch the fly." },
    "bird": { swallowed: "\nHow absurd to swallow a bird!", why: "\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her." },
    "cat": { swallowed: "\nImagine that, to swallow a cat!", why: "\nShe swallowed the cat to catch the bird." },
    "dog": { swallowed: "\nWhat a hog, to swallow a dog!", why: "\nShe swallowed the dog to catch the cat." },
    "goat": { swallowed: "\nJust opened her throat and swallowed a goat!", why: "\nShe swallowed the goat to catch the dog." },
    "cow": { swallowed: "\nI don't know how she swallowed a cow!", why: "\nShe swallowed the cow to catch the goat." },
    "horse": { swallowed: null, why: "\nShe's dead, of course!\n" }
  };
};

FoodChain.prototype.verse = function(num) {
  const animal = this.animalenum[num - 1];
  const animalLine = this.animallines[animal];
  let verse = "I know an old lady who swallowed a " + animal + ".";

  verse += animalLine.swallowed || '';
  verse += animalLine.why;

  if (num > 1 && num < 8) {
    for (let i = num - 1; i > 0; i--) {
      verse += this.animallines[this.animalenum[i - 1]].why;
    }
  }

  return verse;
};

FoodChain.prototype.verses = function(a, b) {
  let song = "";
  const start = Math.min(a, b);
  const end = Math.max(a, b);

  for (let i = start; i <= end; i++) {
    song += this.verse(i) + "\n";
  }
  return song;
};

export default FoodChain;