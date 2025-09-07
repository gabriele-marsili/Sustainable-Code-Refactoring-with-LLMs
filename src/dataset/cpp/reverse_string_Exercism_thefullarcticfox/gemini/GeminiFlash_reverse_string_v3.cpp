#include "reverse_string.h"
#include <algorithm>

namespace reverse_string {
	std::string reverse_string(const std::string& str) {
		std::string reversed_str = str;
		std::reverse(reversed_str.begin(), reversed_str.end());
		return reversed_str;
	}
}  // namespace reverse_string