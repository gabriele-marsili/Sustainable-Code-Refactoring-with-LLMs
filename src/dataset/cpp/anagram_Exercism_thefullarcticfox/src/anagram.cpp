#include "anagram.h"

namespace anagram {
	bool				str_are_equal(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			return false;
		for (size_t i = 0; i < s1.size(); i++)
			if (std::tolower(s1.at(i)) != std::tolower(s2.at(i)))
				return false;
		return true;
	}

	std::map<char, int>	word_map(const std::string& word) {
		std::map<char, int>	res;
		for (char letter : word)
			res[std::tolower(letter)] += 1;
		return res;
	}

	anagram::anagram(const std::string& word) : _word(word), _lettermap(word_map(word)) {}

	std::vector<std::string>	anagram::matches(const std::vector<std::string>& words) {
		std::vector<std::string>	res;
		for (const std::string& word : words)
			if (!str_are_equal(_word, word) && _lettermap == word_map(word))
				res.push_back(word);
		return res;
	}

}  // namespace anagram
