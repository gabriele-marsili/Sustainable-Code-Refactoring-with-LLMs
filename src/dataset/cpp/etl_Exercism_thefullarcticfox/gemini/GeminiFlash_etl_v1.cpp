#include "etl.h"
#include <cctype>
#include <algorithm>

namespace etl {
	std::map<char, int>	transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int>	res;
		res.reserve(old.size()); // Pre-allocate memory to potentially reduce reallocations

		for (const auto& pair : old) {
			int score = pair.first;
			const auto& letters = pair.second;

			for (char elem : letters) {
				char lower_elem = std::tolower(elem);
				res[lower_elem] = score; // Use direct assignment instead of insert to avoid unnecessary checks
			}
		}
		return res;
	}
}  // namespace etl