#include "beer_song.h"

std::string beer::verse(uint16_t beersInt) {
	std::string song;
	if(beersInt == 0){
		song = "No more bottles of beer on the wall, no more bottles of beer.\n"
			"Go to the store and buy some more, 99 bottles of beer on the wall.\n";
	}
	else if (beersInt == 1) {
		song = "1 bottle of beer on the wall, 1 bottle of beer.\n"
			"Take it down and pass it around, no more bottles of beer on the wall.\n";
	}
	else if (beersInt == 2) {
		song = "2 bottles of beer on the wall, 2 bottles of beer.\n"
			"Take one down and pass it around, 1 bottle of beer on the wall.\n";
	}
	else {
		std::string beersStr = std::to_string(beersInt);
		song = beersStr + " bottles of beer on the wall, " + beersStr + " bottles of beer.\n";
		beersStr = std::to_string(beersInt - 1);
		song += "Take one down and pass it around, " + beersStr + " bottles of beer on the wall.\n";
	}
	
	return song;
}
std::string beer::sing(uint16_t one, uint16_t two) {
	std::string song;

	for (int i = one; i >= two; i--) {
		song += verse(i);
		if (i != two) song += "\n";
	}
	return song;
}