import { format as sprintf } from 'util';

const SPECIAL_VERSES = Object.freeze({
  0: "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n",
  1: "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n",
  2: "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n",
});

const NORMAL_VERSE_TEMPLATE = "%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n";

class BeerSong {
  verse(verseNum) {
    return SPECIAL_VERSES[verseNum] || sprintf(NORMAL_VERSE_TEMPLATE, verseNum, verseNum, verseNum - 1);
  }

  sing(start, stop = 0) {
    let song = '';
    for (let verseNum = start; verseNum >= stop; verseNum--) {
      if (song) song += '\n';
      song += this.verse(verseNum);
    }
    return song;
  }
}

export default BeerSong;