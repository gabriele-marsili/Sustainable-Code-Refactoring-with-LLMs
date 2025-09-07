#include "word_count.h"
#include <unordered_map>
#include <sstream>
#include <cctype>

namespace word_count {
	std::map<std::string, int> words(std::string str) {
		std::unordered_map<std::string, int> temp_res;
		std::string word;
		std::stringstream ss;

		// Normalize to lowercase and replace non-alphanumeric characters (except apostrophes) with spaces
		for (char& ch : str) {
			if (std::isalnum(ch) || ch == '\'') {
				ss << static_cast<char>(std::tolower(ch));
			} else {
				ss << ' ';
			}
		}

		// Count words
		while (ss >> word) {
			temp_res[word]++;
		}

		// Convert unordered_map to map for consistent ordering
		return std::map<std::string, int>(temp_res.begin(), temp_res.end());
	}
}  // namespace word_count