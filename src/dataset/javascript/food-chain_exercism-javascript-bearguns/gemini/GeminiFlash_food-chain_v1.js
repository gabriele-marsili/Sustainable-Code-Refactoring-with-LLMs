var FoodChain = function() {
  this.animalLines = {
    "fly": { verseStart: "I know an old lady who swallowed a fly.", swallowed: null,  why: "\nI don't know why she swallowed the fly. Perhaps she'll die.\n" },
    "spider": { verseStart: "I know an old lady who swallowed a spider.", swallowed: "\nIt wriggled and jiggled and tickled inside her.", why: "\nShe swallowed the spider to catch the fly." },
    "bird": { verseStart: "I know an old lady who swallowed a bird.", swallowed: "\nHow absurd to swallow a bird!", why: "\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her." },
    "cat": { verseStart: "I know an old lady who swallowed a cat.", swallowed: "\nImagine that, to swallow a cat!", why: "\nShe swallowed the cat to catch the bird." },
    "dog": { verseStart: "I know an old lady who swallowed a dog.", swallowed: "\nWhat a hog, to swallow a dog!", why: "\nShe swallowed the dog to catch the cat." },
    "goat": { verseStart: "I know an old lady who swallowed a goat.", swallowed: "\nJust opened her throat and swallowed a goat!", why: "\nShe swallowed the goat to catch the dog." },
    "cow": { verseStart: "I know an old lady who swallowed a cow.", swallowed: "\nI don't know how she swallowed a cow!", why: "\nShe swallowed the cow to catch the goat." },
    "horse": { verseStart: "I know an old lady who swallowed a horse.", swallowed: null, why: "\nShe's dead, of course!\n" }
  };

  this.animalOrder = ["fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];
};

FoodChain.prototype.verse = function(num) {
  const animal = this.animalOrder[num - 1];
  const animalData = this.animalLines[animal];
  let verse = animalData.verseStart;

  verse += animalData.swallowed ? animalData.swallowed : '';
  verse += animalData.why;

  if (num > 1 && num < 8) {
    for (let i = num - 1; i > 0; i--) {
      verse += this.animalLines[this.animalOrder[i - 1]].why;
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