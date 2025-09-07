#include "word_count.h"
#include <algorithm>
#include <cctype>

namespace word_count {
	std::map<std::string, int>	words(std::string str) {
		std::map<std::string, int>	res;
		
		// Convert to lowercase in-place
		for (char& c : str) {
			c = std::tolower(static_cast<unsigned char>(c));
		}
		
		// Manual parsing instead of regex
		std::string word;
		word.reserve(32); // Reserve space for typical word length
		
		for (size_t i = 0; i < str.length(); ++i) {
			char c = str[i];
			if (std::isalnum(static_cast<unsigned char>(c)) || c == '\'') {
				word += c;
			} else {
				if (!word.empty()) {
					++res[word];
					word.clear();
				}
			}
		}
		
		// Handle last word if string doesn't end with delimiter
		if (!word.empty()) {
			++res[word];
		}
		
		return res;
	}
}  // namespace word_count