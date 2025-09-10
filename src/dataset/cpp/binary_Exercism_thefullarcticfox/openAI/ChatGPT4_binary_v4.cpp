#include "binary.h"

namespace binary {
	int convert(const std::string& hex) {
		int res = 0;
		for (char l : hex) {
			if (l == '0' || l == '1') {
				res = (res << 1) | (l - '0');
			} else {
				return 0;
			}
		}
		return res;
	}
}  // namespace binary