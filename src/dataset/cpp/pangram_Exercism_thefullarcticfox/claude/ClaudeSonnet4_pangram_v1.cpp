#include "pangram.h"
#include <cctype>

namespace pangram {
	bool	is_pangram(const std::string& str) {
		bool letters[26] = {false};
		int count = 0;
		
		for (char letter : str) {
			if (std::isalpha(letter)) {
				int index = std::tolower(letter) - 'a';
				if (!letters[index]) {
					letters[index] = true;
					if (++count == 26) {
						return true;
					}
				}
			}
		}
		return false;
	}
}  // namespace pangram