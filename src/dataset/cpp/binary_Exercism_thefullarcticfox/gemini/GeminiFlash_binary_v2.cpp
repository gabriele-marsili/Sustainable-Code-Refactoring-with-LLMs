#include "binary.h"
#include <algorithm>

namespace binary {
	int convert(const std::string& binary_string) {
		int result = 0;
		for (char c : binary_string) {
			if (c != '0' && c != '1') {
				return 0;
			}
			result = (result << 1) | (c - '0');
		}
		return result;
	}
}  // namespace binary