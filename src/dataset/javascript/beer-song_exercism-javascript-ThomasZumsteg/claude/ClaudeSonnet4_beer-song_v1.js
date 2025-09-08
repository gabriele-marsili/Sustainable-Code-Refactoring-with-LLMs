import { format as sprintf } from 'util';

var BeerSong = function() {
	// Pre-compute special lines to avoid object lookup overhead
	this.specialLines = {
		0: "No more bottles of beer on the wall, no more bottles of beer.\nGo to the store and buy some more, 99 bottles of beer on the wall.\n",
		1: "1 bottle of beer on the wall, 1 bottle of beer.\nTake it down and pass it around, no more bottles of beer on the wall.\n",
		2: "2 bottles of beer on the wall, 2 bottles of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n",
	};
	this.normalLine = "%d bottles of beer on the wall, %d bottles of beer.\nTake one down and pass it around, %d bottles of beer on the wall.\n";
}

BeerSong.prototype.verse = function( verseNum ) {
	return this.specialLines[verseNum] || sprintf(this.normalLine, verseNum, verseNum, verseNum - 1);
};

BeerSong.prototype.sing = function( start, stop) {
	stop = stop || 0;
	var song = "";
	var isFirst = true;
	
	for(var verseNum = start; verseNum >= stop; verseNum--) {
		if (!isFirst) {
			song += "\n";
		}
		song += this.verse(verseNum);
		isFirst = false;
	}
	return song;
};

export default BeerSong;