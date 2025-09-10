#include "hexadecimal.h"
#include <algorithm>

namespace hexadecimal {
	int convert(const std::string& hex) {
		int res = 0;
		for (char l : hex) {
			int digit;
			if (l >= '0' && l <= '9') {
				digit = l - '0';
			} else if (l >= 'a' && l <= 'f') {
				digit = l - 'a' + 10;
			} else {
				return 0;
			}

			if (res > (INT_MAX / 16)) return 0; // Check for potential overflow before multiplication

			res = (res << 4) | digit; // Equivalent to res * 16 + digit, using bitwise operations
		}
		return res;
	}
}  // namespace hexadecimal