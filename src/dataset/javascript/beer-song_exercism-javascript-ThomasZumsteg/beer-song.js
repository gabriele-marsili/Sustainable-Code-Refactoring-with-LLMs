import { format as sprintf } from 'util';

const SPECIAL_LINES = {
  0: "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n",
  1: "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n",
  2: "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n",
};

const NORMAL_LINE = "%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n";

var BeerSong = function() {}

BeerSong.prototype.verse = function(verseNum) {
  return SPECIAL_LINES[verseNum] || sprintf(NORMAL_LINE, verseNum, verseNum, verseNum - 1);
};

BeerSong.prototype.sing = function(start, stop = 0) {
  const song = [];
  for (let verseNum = start; verseNum >= stop; verseNum--) {
    song.push(this.verse(verseNum));
  }
  return song.join("\n");
};

export default BeerSong;