#include "acronym.h"
#include <cctype>

namespace acronym {
	std::string	acronym(const std::string& str) {
		std::string	res;
		res.reserve(str.size() / 4);
		
		bool in_word = false;
		for (char c : str) {
			if (std::isalnum(c)) {
				if (!in_word) {
					res.push_back(std::toupper(c));
					in_word = true;
				}
			} else {
				in_word = false;
			}
		}
		return res;
	}
}  // namespace acronym