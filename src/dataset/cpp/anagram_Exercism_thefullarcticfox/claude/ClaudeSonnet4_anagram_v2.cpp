#include "anagram.h"

namespace anagram {
	bool				str_are_equal(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			return false;
		for (size_t i = 0; i < s1.size(); i++)
			if (std::tolower(s1[i]) != std::tolower(s2[i]))
				return false;
		return true;
	}

	std::array<int, 26>	word_map(const std::string& word) {
		std::array<int, 26>	res{};
		for (char letter : word) {
			char lower = std::tolower(letter);
			if (lower >= 'a' && lower <= 'z')
				res[lower - 'a']++;
		}
		return res;
	}

	anagram::anagram(const std::string& word) : _word(word), _lettermap(word_map(word)) {}

	std::vector<std::string>	anagram::matches(const std::vector<std::string>& words) {
		std::vector<std::string>	res;
		res.reserve(words.size());
		for (const std::string& word : words)
			if (!str_are_equal(_word, word) && _lettermap == word_map(word))
				res.push_back(word);
		return res;
	}

}  // namespace anagram