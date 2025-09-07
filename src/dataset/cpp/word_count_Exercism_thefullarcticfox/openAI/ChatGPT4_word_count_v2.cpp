#include "word_count.h"
#include <unordered_map>
#include <sstream>
#include <cctype>

namespace word_count {
	std::unordered_map<std::string, int> words(const std::string& str) {
		std::unordered_map<std::string, int> res;
		std::string word;
		std::stringstream ss(str);

		while (ss >> word) {
			// Normalize word: to lowercase and remove leading/trailing non-alphanumeric characters
			auto start = word.begin();
			auto end = word.end();
			while (start != end && !std::isalnum(*start) && *start != '\'') ++start;
			while (end != start && !std::isalnum(*(end - 1)) && *(end - 1) != '\'') --end;
			word = std::string(start, end);
			std::transform(word.begin(), word.end(), word.begin(), ::tolower);

			if (!word.empty()) {
				res[word]++;
			}
		}
		return res;
	}
}  // namespace word_count