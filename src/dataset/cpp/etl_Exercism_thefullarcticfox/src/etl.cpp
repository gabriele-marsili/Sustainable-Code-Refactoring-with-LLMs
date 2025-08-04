#include "etl.h"
#include <cctype>

namespace etl {
	std::map<char, int>	transform(const std::map<int, std::vector<char>>& old) {
		std::map<char, int>	res;
		for (auto& pair : old)
			for (char elem : pair.second)
				res.insert(std::make_pair(std::tolower(elem), pair.first));
		return res;
	}
}  // namespace etl
