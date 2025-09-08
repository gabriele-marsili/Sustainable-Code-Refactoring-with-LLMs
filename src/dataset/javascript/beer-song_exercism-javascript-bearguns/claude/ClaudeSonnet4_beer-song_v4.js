var BeerSong = function() {
  this.actions = {
    0: "\nGo to the store and buy some more, ",
    1: "\nTake it down and pass it around, ",
    def: "\nTake one down and pass it around, "
  };
};

BeerSong.prototype.actionBuilder = function(num) {
  return this.actions[num] || this.actions.def;
};

BeerSong.prototype.howManyBottles = function(num) {
  if (num === 0) return "No more bottles of beer";
  if (num === 1) return "1 bottle of beer";
  return num + " bottles of beer";
};

BeerSong.prototype.nextVerse = function(num) {
  var nextAmt = num === 0 ? 99 : num - 1;
  return this.howManyBottles(nextAmt).toLowerCase() + " on the wall.\n";
};

BeerSong.prototype.songBuilder = function(num) {
  var bottles = this.howManyBottles(num);
  return bottles + " on the wall, " + bottles.toLowerCase() + "." + 
         this.actionBuilder(num) + this.nextVerse(num);
};

BeerSong.prototype.verse = function(num) {
  return this.songBuilder(num);
};

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
    var arg = args[j];
    song += this.songBuilder(arg);
    if (j < args.length - 1) {
      song += "\n" + this.songBuilder(arg - 1) + "\n";
    }
  }
  return song;
};

export default BeerSong;