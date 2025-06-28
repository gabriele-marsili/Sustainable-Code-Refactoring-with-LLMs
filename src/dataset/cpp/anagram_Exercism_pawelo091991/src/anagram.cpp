#include "anagram.h"

namespace anagram {
	anagram::anagram(std::string word) {
		this->word = word;
		dict.resize(26);
		for (auto& b : dict)
			b = 0;

		for (char& c : this->word) {
			c = std::tolower(c);
			dict[c - 97]++;
		}
	}

	std::vector<std::string> anagram::matches(std::vector<std::string> words) {
		std::vector<std::string> return_value;
		for (auto& w : words) {
			std::string copy_w = w;
			for (auto& c : copy_w)
				c = std::tolower(c);

			if (copy_w == this->word || copy_w.size() != this->word.size())
				continue;

			bool anagram = true;
			std::vector<uint16_t> copy_dict = dict;
			for (auto c : w) {
				c = std::tolower(c);
				if (copy_dict[c - 97] == 0) {
					anagram = false;
					break;
				}
				copy_dict[c - 97]--;
			}
			if (anagram == true)
				return_value.push_back(w);
		}
		
		return return_value;
	}
}  // namespace anagram
