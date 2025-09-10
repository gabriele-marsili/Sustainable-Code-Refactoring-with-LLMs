#include "hexadecimal.h"

namespace hexadecimal {
	int convert(const std::string& hex) {
		int res = 0;
		for (char l : hex) {
			if (l >= '0' && l <= '9')
				res = res * 16 + (l - '0');
			else if (l >= 'a' && l <= 'f')
				res = res * 16 + (l - 'a' + 10);
			else
				return 0;
		}
		return res;
	}
}  // namespace hexadecimal