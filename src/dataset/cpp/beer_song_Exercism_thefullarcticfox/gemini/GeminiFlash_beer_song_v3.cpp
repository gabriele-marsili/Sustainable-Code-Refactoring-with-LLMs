#include "beer_song.h"
#include <sstream>
#include <stdexcept>
#include <string>
#include <algorithm>

namespace beer_song {

	std::string n_bottles_tostring(int n) {
		if (n == 0) {
			return "no more bottle" + std::string("s");
		}
		else if (n == 1) {
			return "1 bottle";
		}
		else {
			return std::to_string(n) + " bottles";
		}
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

		res[0] = static_cast<char>(std::toupper(res[0]));

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
		int num_verses = first - last + 1;
		res.reserve(num_verses * 250);

		for (int i = first; i >= last; --i) {
			res += verse(i);
			if (i != last) {
				res += '\n';
			}
		}

		return res;
	}
}  // namespace beer_song