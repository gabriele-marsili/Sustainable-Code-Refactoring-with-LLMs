#include "binary.h"

namespace binary {
	int		convert(const std::string& hex) {
		int	res = 0;
		const char* ptr = hex.data();
		const char* end = ptr + hex.size();
		
		for (; ptr != end; ++ptr) {
			char l = *ptr;
			if (l == '0') {
				res <<= 1;
			} else if (l == '1') {
				res = (res << 1) | 1;
			} else {
				return 0;
			}
		}
		return res;
	}
}  // namespace binary