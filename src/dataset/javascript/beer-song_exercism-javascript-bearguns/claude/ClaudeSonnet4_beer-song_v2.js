var BeerSong = function() {}

BeerSong.prototype.actionBuilder = function(num) {
  return num === 0 ? "\nGo to the store and buy some more, " :
         num === 1 ? "\nTake it down and pass it around, " :
         "\nTake one down and pass it around, ";
}

BeerSong.prototype.howManyBottles = function(num) {
  return num === 0 ? "No more bottles of beer" :
         num === 1 ? "1 bottle of beer" :
         num + " bottles of beer";
}

BeerSong.prototype.nextVerse = function(num) {
  var nextAmt = num === 0 ? 99 : num - 1;
  return (this.howManyBottles(nextAmt) + " on the wall.\n").toLowerCase();
}

BeerSong.prototype.songBuilder = function(num) {
  var bottles = this.howManyBottles(num);
  return bottles + " on the wall, " + bottles.toLowerCase() + "." + 
         this.actionBuilder(num) + this.nextVerse(num);
}

BeerSong.prototype.verse = function(num) {
  return this.songBuilder(num);
}

BeerSong.prototype.sing = function() {
  var args = [].slice.call(arguments);
  var song = '';

  if (args.length === 1) {
    for (var i = args[0]; i >= 0; i--) {
      song += this.songBuilder(i);
      if (i > 0) song += "\n";
    }
    return song;
  }

  for (var j = 0; j < args.length; j++) {
    song += this.songBuilder(args[j]);
    if (j < args.length - 1) {
      song += "\n" + this.songBuilder(args[j] - 1) + "\n";
    }
  }
  return song;
}

export default BeerSong;