import { format as sprintf } from 'util';

class BeerSong {
  verse(verseNum) {
    const specialLines = {
      0: "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n",
      1: "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n",
      2: "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n",
    };

    if (specialLines[verseNum] !== undefined) {
      return specialLines[verseNum];
    }

    return `${verseNum} bottles of beer on the wall, ${verseNum} bottles of beer.\nTake one down and pass it around, ${verseNum - 1} bottles of beer on the wall.\n`;
  }

  sing(start, stop = 0) {
    return Array.from({ length: start - stop + 1 }, (_, i) => this.verse(start - i)).join("\n");
  }
}

export default BeerSong;