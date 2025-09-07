#include "acronym.h"
#include <cctype>
#include <algorithm>

namespace acronym {
	std::string acronym(const std::string& str) {
		std::string res;
		res.reserve(str.size() / 2); // Pre-allocate memory to avoid reallocations

		bool new_word = true;
		for (char c : str) {
			if (std::isalnum(c)) {
				if (new_word) {
					res.push_back(std::toupper(c));
					new_word = false;
				}
			} else {
				new_word = true;
			}
		}
		return res;
	}
}  // namespace acronym