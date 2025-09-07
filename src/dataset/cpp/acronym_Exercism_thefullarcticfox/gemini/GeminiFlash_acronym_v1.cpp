#include "acronym.h"
#include <cctype>
#include <algorithm>

namespace acronym {
	std::string acronym(const std::string& str) {
		std::string res;
		bool need_upper = true;

		for (char c : str) {
			if (std::isalpha(c)) {
				if (need_upper) {
					res += std::toupper(c);
					need_upper = false;
				}
			} else if (c == ' ' || c == '-') {
				need_upper = true;
			}
		}
		return res;
	}
}  // namespace acronym