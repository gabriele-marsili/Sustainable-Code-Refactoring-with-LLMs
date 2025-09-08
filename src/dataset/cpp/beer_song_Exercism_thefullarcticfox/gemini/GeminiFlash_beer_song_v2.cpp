#include "beer_song.h"
#include <string>
#include <stdexcept>
#include <algorithm>

namespace beer_song {

	std::string n_bottles_tostring(int n) {
		if (n == 0) {
			return "no more bottles";
		}
		if (n == 1) {
			return "1 bottle";
		}
		return std::to_string(n) + " bottles";
	}

	std::string verse(int number) {
		if (number < 0 || number > 99) {
			throw std::invalid_argument("no such verse");
		}

		std::string bottlestr = n_bottles_tostring(number);
		std::string res;

		res.reserve(150); 

		res += bottlestr;
		res += " of beer on the wall, ";
		res += bottlestr;
		res += " of beer.\n";

		res[0] = toupper(res[0]);

		if (number > 0) {
			res += "Take ";
			res += (number == 1 ? "it" : "one");
			res += " down and pass it around, ";
		}
		else {
			res += "Go to the store and buy some more, ";
			number = 100;
		}

		res += n_bottles_tostring(number - 1);
		res += " of beer on the wall.\n";

		return res;
	}

	std::string sing(int first, int last) {
		std::string res;
		for (int i = first; i >= last; --i) {
			res += verse(i);
			if (i != last) {
				res += '\n';
			}
		}
		return res;
	}
}  // namespace beer_song