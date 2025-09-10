#include "etl.h"
#include <cctype>
#include <map>
#include <vector>

namespace etl {
	std::map<char, int> transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int> res;
		for (const auto& [key, values] : old) {
			for (char elem : values) {
				res[std::tolower(elem)] = key;
			}
		}
		return res;
	}
}  // namespace etl