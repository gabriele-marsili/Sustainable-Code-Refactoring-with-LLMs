#include "pangram.h"
#include <bitset>
#include <cctype>

namespace pangram {
	bool	is_pangram(const std::string& str) {
		std::bitset<26> letters;
		for (char letter : str) {
			if (std::isalpha(letter)) {
				letters.set(std::tolower(letter) - 'a');
				if (letters.all()) return true;
			}
		}
		return letters.all();
	}
}  // namespace pangram