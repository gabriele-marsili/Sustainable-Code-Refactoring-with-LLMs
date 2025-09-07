#include "acronym.h"
#include <cctype>

namespace acronym {
	std::string acronym(const std::string& str) {
		std::string res;
		bool new_word = true;
		for (char ch : str) {
			if (std::isalnum(ch)) {
				if (new_word) {
					res.push_back(std::toupper(ch));
					new_word = false;
				}
			} else {
				new_word = true;
			}
		}
		return res;
	}
}  // namespace acronym