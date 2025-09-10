#include "trinary.h"
#include <algorithm>

namespace trinary {
	int to_decimal(const std::string& trinary) {
		int res = 0;
		size_t n = trinary.length();

		for (size_t i = 0; i < n; ++i) {
			char digit = trinary[i];
			if (digit < '0' || digit > '2') {
				return 0;
			}
			res = res * 3 + (digit - '0');
		}
		return res;
	}
}  // namespace trinary