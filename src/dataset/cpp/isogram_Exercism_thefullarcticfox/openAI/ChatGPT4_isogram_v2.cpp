#include "isogram.h"
#include <unordered_set>
#include <cctype>

namespace isogram {
	bool is_isogram(const std::string& s) {
		std::unordered_set<char> seen_chars;

		for (char c : s) {
			if (std::isalpha(c)) {
				char lower_c = std::tolower(c);
				if (seen_chars.find(lower_c) != seen_chars.end()) {
					return false;
				}
				seen_chars.insert(lower_c);
			}
		}
		return true;
	}
}  // namespace isogram