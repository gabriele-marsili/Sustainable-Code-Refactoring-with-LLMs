var FoodChain = function() {
  this.animals = ["", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"];
  this.swallowed = ["", null, "\nIt wriggled and jiggled and tickled inside her.", "\nHow absurd to swallow a bird!", "\nImagine that, to swallow a cat!", "\nWhat a hog, to swallow a dog!", "\nJust opened her throat and swallowed a goat!", "\nI don't know how she swallowed a cow!", null];
  this.whyLines = ["", "\nI don't know why she swallowed the fly. Perhaps she'll die.\n", "\nShe swallowed the spider to catch the fly.", "\nShe swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.", "\nShe swallowed the cat to catch the bird.", "\nShe swallowed the dog to catch the cat.", "\nShe swallowed the goat to catch the dog.", "\nShe swallowed the cow to catch the goat.", "\nShe's dead, of course!\n"];
}

FoodChain.prototype.verse = function(num) {
  var animal = this.animals[num];
  var verse = "I know an old lady who swallowed a " + animal + ".";
  
  if (this.swallowed[num]) {
    verse += this.swallowed[num];
  }
  verse += this.whyLines[num];

  if (num > 1 && num < 8) {
    for (var i = num - 1; i > 0; i--) {
      verse += this.whyLines[i];
    }
  }

  return verse;
}

FoodChain.prototype.verses = function(a, b) {
  var song = "";
  var start = Math.min(a, b);
  var end = Math.max(a, b);

  for (var i = start; i <= end; i++) {
    song += this.verse(i) + "\n";
  }
  return song;
}

export default FoodChain;