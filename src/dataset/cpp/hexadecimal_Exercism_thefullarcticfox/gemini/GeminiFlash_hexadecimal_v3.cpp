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
			if (res > (INT_MAX / 16)) return 0; 
			res = (res << 4) | digit;
		}
		return res;
	}
}  // namespace hexadecimal