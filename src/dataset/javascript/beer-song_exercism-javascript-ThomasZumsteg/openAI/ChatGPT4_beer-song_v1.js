import { format as sprintf } from 'util';

class BeerSong {
  verse(verseNum) {
    const specialLines = {
      0: "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n",
      1: "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n",
      2: "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n",
    };

    if (verseNum in specialLines) {
      return specialLines[verseNum];
    }

    return sprintf(
      "%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n",
      verseNum,
      verseNum,
      verseNum - 1
    );
  }

  sing(start, stop = 0) {
    const verses = Array.from(
      { length: start - stop + 1 },
      (_, i) => this.verse(start - i)
    );
    return verses.join("\n");
  }
}

export default BeerSong;