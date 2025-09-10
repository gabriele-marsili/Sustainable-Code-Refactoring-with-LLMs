#include "food_chain.h"
#include <array>

namespace food_chain {
	std::string verse(int verse_num) {
		static const std::array<std::pair<std::string, std::string>, 8> verse_data{
			std::make_pair("fly", "I don't know why she swallowed the fly. Perhaps she'll die."),
			std::make_pair("spider", "It wriggled and jiggled and tickled inside her."),
			std::make_pair("bird", "How absurd to swallow a bird!"),
			std::make_pair("cat", "Imagine that, to swallow a cat!"),
			std::make_pair("dog", "What a hog, to swallow a dog!"),
			std::make_pair("goat", "Just opened her throat and swallowed a goat!"),
			std::make_pair("cow", "I don't know how she swallowed a cow!"),
			std::make_pair("horse", "She's dead, of course!")
		};

		std::string res = "I know an old lady who swallowed a " + verse_data[verse_num - 1].first + ".\n";
		if (verse_num > 1)
			res += verse_data[verse_num - 1].second + "\n";
		if (verse_num == 8)
			return res;

		for (int i = verse_num; i > 1; --i) {
			res += "She swallowed the " + verse_data[i - 1].first + " to catch the " + verse_data[i - 2].first;
			if (i == 2)
				res += " that wriggled and jiggled and tickled inside her";
			res += ".\n";
		}
		res += verse_data[0].second + "\n";
		return res;
	}

	std::string verses(int first, int last) {
		std::string res;
		for (int i = first; i <= last; ++i) {
			res += verse(i) + "\n";
		}
		return res;
	}

	std::string sing() {
		return verses(1, 8);
	}
}  // namespace food_chain