#include "pangram.h"
#include <unordered_set>
#include <cctype>

namespace pangram {
	bool	is_pangram(const std::string& str) {
		std::unordered_set<char>	letters;
		for (char letter : str)
			if (std::isalpha(letter))
				letters.insert(std::tolower(letter));
		return letters.size() == 26;
	}
}  // namespace pangram
