var BeerSong = function() {
  this.actions = {
    onemore: "\nTake it down and pass it around, ",
    nomore: "\nGo to the store and buy some more, ",
    def: "\nTake one down and pass it around, "
  };
};

BeerSong.prototype.actionBuilder = function(num) {
  switch(num) {
    case 0:
      return this.actions.nomore;
    case 1:
      return this.actions.onemore;
    default:
      return this.actions.def;
  }
};

BeerSong.prototype.howManyBottles = function(num) {
  if (num === 0) {
    return "No more bottles of beer";
  } else if (num === 1) {
    return "1 bottle of beer";
  } else {
    return num + " bottles of beer";
  }
};

BeerSong.prototype.nextVerse = function(num) {
  const nextAmt = num - 1;
  const ofBeer = " on the wall.\n";
  const next = (nextAmt === -1 ? this.howManyBottles(99) : this.howManyBottles(nextAmt)) + ofBeer;
  return next.toLowerCase();
};

BeerSong.prototype.songBuilder = function(num) {
  const bottles = this.howManyBottles(num);
  const action = this.actionBuilder(num);
  const next = this.nextVerse(num);
  return bottles + " on the wall, " + bottles.toLowerCase() + "." + action + next;
};

BeerSong.prototype.verse = function(num) {
  return this.songBuilder(num);
};

BeerSong.prototype.sing = function() {
  const args = Array.from(arguments);
  let song = '';

  if (args.length === 1) {
    let i = args[0];
    while (i > -1) {
      song += this.songBuilder(i);
      if (i !== 0) {
        song += "\n";
      }
      i--;
    }
    return song;
  }

  for (let i = 0; i < args.length; i++) {
    song += this.songBuilder(args[i]);
    if (i < args.length - 1) {
      song += "\n" + this.songBuilder(args[i] - 1) + "\n";
    }
  }
  return song;
};

export default BeerSong;