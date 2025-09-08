#include "isogram.h"
#include <algorithm>
#include <cctype>

namespace isogram {
	bool is_isogram(const std::string& s) {
		if (s.empty()) {
			return true;
		}

		std::string tmp;
		tmp.reserve(s.size());

		for (char c : s) {
			if (std::isalpha(c)) {
				tmp.push_back(std::tolower(c));
			}
		}

		if (tmp.empty()) {
			return true;
		}

		std::sort(tmp.begin(), tmp.end());

		for (size_t i = 1; i < tmp.size(); ++i) {
			if (tmp[i - 1] == tmp[i]) {
				return false;
			}
		}

		return true;
	}
}  // namespace isogram