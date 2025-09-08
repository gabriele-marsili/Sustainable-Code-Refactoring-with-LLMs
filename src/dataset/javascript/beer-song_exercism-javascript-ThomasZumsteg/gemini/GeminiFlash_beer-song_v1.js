var BeerSong = function() {};

BeerSong.prototype.verse = function(verseNum) {
    if (verseNum === 0) {
        return "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n";
    } else if (verseNum === 1) {
        return "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n";
    } else if (verseNum === 2) {
        return "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n";
    } else {
        return `${verseNum} bottles of beer on the wall, ${verseNum} bottles of beer.\nTake one down and pass it around, ${verseNum - 1} bottles of beer on the wall.\n`;
    }
};

BeerSong.prototype.sing = function(start, stop) {
    stop = stop === undefined ? 0 : stop;
    let song = "";
    for (let verseNum = start; verseNum >= stop; verseNum--) {
        song += this.verse(verseNum);
        if (verseNum !== stop) {
            song += "\n";
        }
    }
    return song;
};

export default BeerSong;