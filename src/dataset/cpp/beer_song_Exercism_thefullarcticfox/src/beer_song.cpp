#include "beer_song.h"
#include <sstream>
#include <stdexcept>

namespace beer_song {
	std::string		n_bottles_tostring(int n) {
		std::ostringstream	res;
		if (n)
			res << n;
		else
			res << "no more";
		res << " bottle" << (n == 1 ? "" : "s");
		return (res.str());
	}

	std::string		verse(int number) {
		if (number < 0 || number > 99)
			throw std::invalid_argument("no such verse");

		std::string	bottlestr(n_bottles_tostring(number));
		std::string	res;

		res += bottlestr + " of beer on the wall, " + bottlestr + " of beer.\n";
		res.at(0) = std::toupper(res.at(0));

		if (number)
			res += "Take " + std::string(number == 1 ? "it" : "one") + " down and pass it around, ";
		else {
			res += "Go to the store and buy some more, ";
			number = 100;
		}

		res += n_bottles_tostring(number - 1) + " of beer on the wall.\n";
		return (res);
	}

	std::string		sing(int first, int last) {
		std::string	res;
		while (first >= last)
			res += verse(first--) + '\n';
		res.pop_back();
		return (res);
	}
}  // namespace beer_song
