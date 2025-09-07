#include "acronym.h"
#include <cctype>

namespace acronym {
	std::string	acronym(const std::string& str) {
		std::string	res;
		res.reserve(str.size() / 4);
		
		bool in_word = false;
		for (char c : str) {
			if (std::isalnum(static_cast<unsigned char>(c))) {
				if (!in_word) {
					res.push_back(std::toupper(static_cast<unsigned char>(c)));
					in_word = true;
				}
			} else {
				in_word = false;
			}
		}
		return res;
	}
}  // namespace acronym