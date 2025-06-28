#include "etl.h"

namespace etl {
	std::map<char, int> transform(std::map<int, std::vector<char>> old_sys) {
		std::map<char, int> new_sys;

		for (std::pair<int, std::vector<char>> i : old_sys) {
			for (auto c : i.second) {
				c = std::tolower(c);
				new_sys[c] = i.first;
			}
		}
		return new_sys;
	}
}  // namespace etl
