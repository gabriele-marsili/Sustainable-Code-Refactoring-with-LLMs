#include "isogram.h"
#include <unordered_set>
#include <cctype>

namespace isogram {
	bool	is_isogram(const std::string& s) {
		if (s.empty())
			return true;

		std::unordered_set<char> seen;
		seen.reserve(26); // Maximum 26 letters in alphabet
		
		for (char c : s) {
			if (c != ' ' && c != '-') {
				char lower_c = std::tolower(static_cast<unsigned char>(c));
				if (!seen.insert(lower_c).second) {
					return false;
				}
			}
		}
		return true;
	}
}  // namespace isogram