#include "food_chain.h"
#include <array>

namespace food_chain {
	std::string verse(int verse_num) {
		static const std::array<std::pair<std::string, std::string>, 8> versemap{{
			{"fly", "I don't know why she swallowed the fly. Perhaps she'll die."},
			{"spider", "It wriggled and jiggled and tickled inside her."},
			{"bird", "How absurd to swallow a bird!"},
			{"cat", "Imagine that, to swallow a cat!"},
			{"dog", "What a hog, to swallow a dog!"},
			{"goat", "Just opened her throat and swallowed a goat!"},
			{"cow", "I don't know how she swallowed a cow!"},
			{"horse", "She's dead, of course!"}
		}};

		std::string res = "I know an old lady who swallowed a " + versemap[verse_num - 1].first + ".\n";
		if (verse_num > 1)
			res += versemap[verse_num - 1].second + "\n";
		if (verse_num == 8)
			return res;

		for (int i = verse_num; i > 1; --i) {
			res += "She swallowed the " + versemap[i - 1].first + " to catch the " + versemap[i - 2].first;
			if (i == 2)
				res += " that wriggled and jiggled and tickled inside her";
			res += ".\n";
		}
		res += versemap[0].second + "\n";
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