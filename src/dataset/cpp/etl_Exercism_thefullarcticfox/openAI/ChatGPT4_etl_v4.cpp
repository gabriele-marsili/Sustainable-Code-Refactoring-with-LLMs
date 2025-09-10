#include "etl.h"
#include <cctype>
#include <map>
#include <vector>

namespace etl {
	std::map<char, int> transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int> res;
		res.reserve(old.size() * 10); // Pre-allocate assuming average vector size
		for (const auto& [score, letters] : old) {
			for (char letter : letters) {
				res[std::tolower(letter)] = score;
			}
		}
		return res;
	}
}  // namespace etl