#include "etl.h"
#include <cctype>
#include <algorithm>

namespace etl {
	std::map<char, int>	transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int>	res;
		res.reserve(old.size()); 

		for (const auto& pair : old) {
			int score = pair.first;
			const auto& letters = pair.second;
			for (char elem : letters) {
				char lower_elem = std::tolower(elem);
				res.emplace(lower_elem, score);
			}
		}
		return res;
	}
}  // namespace etl