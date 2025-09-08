#include "isogram.h"
#include <unordered_set>

namespace isogram {
	bool	is_isogram(const std::string& s) {
		if (s.empty())
			return true;

		std::unordered_set<char> seen;
		seen.reserve(26);

		for (char c : s) {
			if (c == ' ' || c == '-')
				continue;
			
			char lower_c = (c >= 'A' && c <= 'Z') ? c + 32 : c;
			
			if (!seen.insert(lower_c).second)
				return false;
		}
		return true;
	}
}  // namespace isogram