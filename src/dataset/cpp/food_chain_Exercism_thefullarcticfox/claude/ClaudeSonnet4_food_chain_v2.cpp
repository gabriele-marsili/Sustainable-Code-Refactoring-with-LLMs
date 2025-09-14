#include "food_chain.h"

namespace food_chain {
	std::string	verse(int verse_num) {
		static const char* animals[] = {"", "fly", "spider", "bird", "cat", "dog", "goat", "cow", "horse"};
		static const char* descriptions[] = {
			"",
			"I don't know why she swallowed the fly. Perhaps she'll die.",
			"It wriggled and jiggled and tickled inside her.",
			"How absurd to swallow a bird!",
			"Imagine that, to swallow a cat!",
			"What a hog, to swallow a dog!",
			"Just opened her throat and swallowed a goat!",
			"I don't know how she swallowed a cow!",
			"She's dead, of course!"
		};

		std::string	res;
		res.reserve(500);
		res = "I know an old lady who swallowed a ";
		res += animals[verse_num];
		res += ".\n";
		
		if (verse_num > 1)
			res += descriptions[verse_num];
		if (verse_num > 1)
			res += "\n";
		if (verse_num == 8)
			return res;
		
		for (int i = verse_num; i > 1; --i) {
			res += "She swallowed the ";
			res += animals[i];
			res += " to catch the ";
			res += animals[i-1];
			if (i-1 == 2)
				res += " that wriggled and jiggled and tickled inside her";
			res += ".\n";
		}
		res += descriptions[1];
		res += "\n";
		return res;
	}

	std::string	verses(int first, int last) {
		std::string	res;
		res.reserve((last - first + 1) * 500);
		for (int i = first; i <= last; ++i) {
			res += verse(i);
			res += "\n";
		}
		return res;
	}

	std::string	sing() {
		return verses(1, 8);
	}
}  // namespace food_chain