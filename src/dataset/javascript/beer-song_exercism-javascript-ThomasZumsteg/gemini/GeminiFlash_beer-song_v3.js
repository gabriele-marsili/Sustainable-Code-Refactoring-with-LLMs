import { format as sprintf } from 'util';

var BeerSong = function() {};

BeerSong.prototype.verse = function(verseNum) {
    switch (verseNum) {
        case 0:
            return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n";
        case 1:
            return "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n";
        case 2:
            return "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n";
        default:
            return sprintf("%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottle%s of beer on the wall.\n",
                           verseNum, verseNum, verseNum - 1, verseNum === 2 ? 's' : '');
    }
};

BeerSong.prototype.sing = function(start, stop) {
    stop = stop || 0;
    let song = "";
    for (let verseNum = start; verseNum >= stop; verseNum--) {
        song += this.verse(verseNum);
        if (verseNum > stop) {
            song += "\n";
        }
    }
    return song;
};

export default BeerSong;