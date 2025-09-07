#include "acronym.h"
#include <cctype>
#include <algorithm>

namespace acronym {
	std::string acronym(const std::string& str) {
		std::string res;
		res.reserve(str.size() / 2); // Pre-allocate memory to avoid reallocations

		bool need_cap = true;
		for (char c : str) {
			if (std::isalnum(c)) {
				if (need_cap) {
					res.push_back(std::toupper(c));
					need_cap = false;
				}
			} else {
				need_cap = true;
			}
		}
		return res;
	}
}  // namespace acronym