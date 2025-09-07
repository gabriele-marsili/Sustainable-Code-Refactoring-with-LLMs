#include "anagram.h"
#include <algorithm>

namespace anagram {

	anagram::anagram(const std::string& word) : _word(word) {
		_lettermap.resize(26, 0);
		std::transform(_word.begin(), _word.end(), _word.begin(), ::tolower);
		for (char letter : _word) {
			_lettermap[letter - 'a']++;
		}
	}

	std::vector<std::string> anagram::matches(const std::vector<std::string>& words) {
		std::vector<std::string> res;
		for (const std::string& word : words) {
			if (word.size() != _word.size()) continue;

			std::string lower_word = word;
			std::transform(lower_word.begin(), lower_word.end(), lower_word.begin(), ::tolower);

			if (lower_word == _word) continue;

			std::vector<int> word_lettermap(26, 0);
			for (char letter : lower_word) {
				word_lettermap[letter - 'a']++;
			}

			if (_lettermap == word_lettermap) {
				res.push_back(word);
			}
		}
		return res;
	}

}  // namespace anagram