#include "pangram.h"
#include <bitset>
#include <cctype>

namespace pangram {
	bool is_pangram(const std::string& str) {
		std::bitset<26> letters;
		for (char ch : str) {
			if (std::isalpha(static_cast<unsigned char>(ch))) {
				letters.set(std::tolower(static_cast<unsigned char>(ch)) - 'a');
				if (letters.all()) return true;
			}
		}
		return letters.all();
	}
}  // namespace pangram