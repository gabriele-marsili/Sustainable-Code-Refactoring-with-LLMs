#include "beer_song.h"
#include <string>
#include <algorithm>

namespace beer_song {

	std::string verse(int number) {
		if (number < 0 || number > 99) {
			throw std::invalid_argument("no such verse");
		}

		std::string bottle_str;
		if (number == 0) {
			bottle_str = "no more bottles";
		} else if (number == 1) {
			bottle_str = "1 bottle";
		} else {
			bottle_str = std::to_string(number) + " bottles";
		}

		std::string result = bottle_str;
		result[0] = std::toupper(result[0]);
		result += " of beer on the wall, " + bottle_str + " of beer.\n";

		if (number == 0) {
			result += "Go to the store and buy some more, 99 bottles of beer on the wall.\n";
		} else {
			result += "Take " + std::string(number == 1 ? "it" : "one") + " down and pass it around, ";

			if (number == 1) {
				result += "no more bottles of beer on the wall.\n";
			} else if (number == 2) {
				result += "1 bottle of beer on the wall.\n";
			} else {
				result += std::to_string(number - 1) + " bottles of beer on the wall.\n";
			}
		}

		return result;
	}

	std::string sing(int first, int last) {
		std::string result;
		for (int i = first; i >= last; --i) {
			result += verse(i);
			if (i != last) {
				result += '\n';
			}
		}
		return result;
	}
}  // namespace beer_song