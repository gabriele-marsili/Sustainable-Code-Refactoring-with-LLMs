#include "food_chain.h"
#include <map>

namespace food_chain {
	std::string	verse(int verse_num) {
		const std::map< int, std::pair<std::string, std::string> >	versemap{
			{1, {"fly", "I don't know why she swallowed the fly. Perhaps she'll die."}},
			{2, {"spider", "It wriggled and jiggled and tickled inside her."}},
			{3, {"bird", "How absurd to swallow a bird!"}},
			{4, {"cat", "Imagine that, to swallow a cat!"}},
			{5, {"dog", "What a hog, to swallow a dog!"}},
			{6, {"goat", "Just opened her throat and swallowed a goat!"}},
			{7, {"cow", "I don't know how she swallowed a cow!"}},
			{8, {"horse", "She's dead, of course!"}}
		};

		std::string	res = "I know an old lady who swallowed a " + versemap.at(verse_num).first + ".\n";
		if (verse_num > 1)
			res += versemap.at(verse_num).second + "\n";
		if (verse_num == 8)
			return res;
		while (verse_num > 1) {
			res += "She swallowed the " + versemap.at(verse_num).first;
			--verse_num;
			res += " to catch the " + versemap.at(verse_num).first;
			if (verse_num == 2)
				res += " that wriggled and jiggled and tickled inside her";
			res += ".\n";
		}
		res += versemap.at(verse_num).second + "\n";
		return res;
	}

	std::string	verses(int first, int last) {
		std::string	res;
		while (first <= last) {
			res += verse(first) + "\n";
			first++;
		}
		return res;
	}

	std::string	sing() {
		return verses(1, 8);
	}
}  // namespace food_chain
