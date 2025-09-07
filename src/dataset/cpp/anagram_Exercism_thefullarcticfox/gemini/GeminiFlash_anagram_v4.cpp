#include "anagram.h"
#include <algorithm>
#include <cctype>

namespace anagram {

	anagram::anagram(const std::string& word) : _word(word) {
		_lettermap.resize(26, 0);
		for (char letter : word) {
			_lettermap[std::tolower(letter) - 'a']++;
		}
	}

	std::vector<std::string> anagram::matches(const std::vector<std::string>& words) {
		std::vector<std::string> res;
		std::string lower_word = _word;
		std::transform(lower_word.begin(), lower_word.end(), lower_word.begin(), ::tolower);

		for (const std::string& word : words) {
			if (word.size() != _word.size()) continue;

			std::string lower_candidate = word;
			std::transform(lower_candidate.begin(), lower_candidate.end(), lower_candidate.begin(), ::tolower);

			if (lower_candidate == lower_word) continue;

			std::vector<int> candidate_lettermap(26, 0);
			for (char letter : word) {
				candidate_lettermap[std::tolower(letter) - 'a']++;
			}

			if (_lettermap == candidate_lettermap) {
				res.push_back(word);
			}
		}
		return res;
	}

}  // namespace anagram