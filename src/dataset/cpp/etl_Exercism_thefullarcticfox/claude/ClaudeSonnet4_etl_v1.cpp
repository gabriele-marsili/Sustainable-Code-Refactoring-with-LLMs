#include "etl.h"
#include <cctype>

namespace etl {
	std::map<char, int>	transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int>	res;
		res.reserve(old.size() * 10); // Reasonable estimate to reduce reallocations
		
		for (const auto& pair : old) {
			const int score = pair.first;
			for (const char elem : pair.second) {
				res.emplace(std::tolower(elem), score);
			}
		}
		return res;
	}
}  // namespace etl