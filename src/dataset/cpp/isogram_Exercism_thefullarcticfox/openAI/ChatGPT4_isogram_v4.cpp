#include "isogram.h"
#include <unordered_set>
#include <cctype>

namespace isogram {
	bool is_isogram(const std::string& s) {
		std::unordered_set<char> seen;
		for (char c : s) {
			if (std::isalpha(c)) {
				char lower_c = std::tolower(c);
				if (!seen.insert(lower_c).second) {
					return false;
				}
			}
		}
		return true;
	}
}  // namespace isogram