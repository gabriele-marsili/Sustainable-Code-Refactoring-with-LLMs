#include "etl.h"
#include <cctype>
#include <algorithm>

namespace etl {
	std::map<char, int> transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int> res;
		res.reserve(old.size()); // Pre-allocate space to potentially reduce reallocations

		for (const auto& pair : old) {
			int score = pair.first;
			const auto& letters = pair.second;

			for (char letter : letters) {
				char lower_letter = std::tolower(letter);
				res.emplace(lower_letter, score); // Use emplace to avoid unnecessary temporary object creation
			}
		}
		return res;
	}
}  // namespace etl