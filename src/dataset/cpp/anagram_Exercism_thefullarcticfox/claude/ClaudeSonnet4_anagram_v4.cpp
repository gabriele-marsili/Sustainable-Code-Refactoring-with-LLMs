#include "anagram.h"
#include <unordered_map>
#include <algorithm>
#include <cctype>

namespace anagram {
	bool str_are_equal(const std::string& s1, const std::string& s2) {
		if (s1.size() != s2.size())
			return false;
		return std::equal(s1.begin(), s1.end(), s2.begin(),
			[](char a, char b) { return std::tolower(a) == std::tolower(b); });
	}

	std::unordered_map<char, int> word_map(const std::string& word) {
		std::unordered_map<char, int> res;
		res.reserve(word.size());
		for (char letter : word)
			++res[std::tolower(letter)];
		return res;
	}

	anagram::anagram(const std::string& word) : _word(word), _lettermap(word_map(word)) {}

	std::vector<std::string> anagram::matches(const std::vector<std::string>& words) {
		std::vector<std::string> res;
		res.reserve(words.size());
		for (const std::string& word : words) {
			if (!str_are_equal(_word, word) && _lettermap == word_map(word))
				res.push_back(word);
		}
		return res;
	}

}  // namespace anagram