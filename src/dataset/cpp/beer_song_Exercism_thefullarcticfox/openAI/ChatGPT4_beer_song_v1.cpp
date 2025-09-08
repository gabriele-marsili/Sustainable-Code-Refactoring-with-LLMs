#include "beer_song.h"
#include <sstream>
#include <stdexcept>
#include <string>

namespace beer_song {
	std::string n_bottles_tostring(int n) {
		if (n == 0) return "no more bottles";
		if (n == 1) return "1 bottle";
		return std::to_string(n) + " bottles";
	}

	std::string verse(int number) {
		if (number < 0 || number > 99)
			throw std::invalid_argument("no such verse");

		std::string bottlestr = n_bottles_tostring(number);
		std::string next_bottlestr = n_bottles_tostring(number - 1);

		std::string res = bottlestr + " of beer on the wall, " + bottlestr + " of beer.\n";
		res[0] = std::toupper(res[0]);

		if (number > 0) {
			res += "Take " + std::string(number == 1 ? "it" : "one") + " down and pass it around, ";
		} else {
			res += "Go to the store and buy some more, ";
			next_bottlestr = n_bottles_tostring(99);
		}

		res += next_bottlestr + " of beer on the wall.\n";
		return res;
	}

	std::string sing(int first, int last) {
		std::ostringstream res;
		for (int i = first; i >= last; --i) {
			res << verse(i);
			if (i != last) res << '\n';
		}
		return res.str();
	}
}  // namespace beer_song