#include "anagram.h"
#include <algorithm>
#include <cctype>

namespace anagram {

	anagram::anagram(const std::string& word) : _word(word) {
		_lettermap = word_map(_word);
	}

	std::map<char, int>	anagram::word_map(const std::string& word) const{
		std::map<char, int>	res;
		for (char letter : word) {
			res[std::tolower(letter)] += 1;
		}
		return res;
	}

	bool str_are_equal(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			return false;

		for (size_t i = 0; i < s1.size(); ++i) {
			if (std::tolower(s1[i]) != std::tolower(s2[i])) {
				return false;
			}
		}
		return true;
	}

	std::vector<std::string> anagram::matches(const std::vector<std::string>& words) {
		std::vector<std::string> res;
		for (const std::string& word : words) {
			if (_word.size() != word.size()) continue;
			if (str_are_equal(_word, word)) continue;
			if (_lettermap == word_map(word))
				res.push_back(word);
		}
		return res;
	}

}  // namespace anagram