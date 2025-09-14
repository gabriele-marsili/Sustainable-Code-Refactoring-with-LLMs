#include "binary.h"

namespace binary {
	int		convert(const std::string& hex) {
		int	res = 0;
		const size_t size = hex.size();
		
		for (size_t i = 0; i < size; ++i) {
			const char c = hex[i];
			if (c == '0') {
				res <<= 1;
			} else if (c == '1') {
				res = (res << 1) | 1;
			} else {
				return 0;
			}
		}
		return res;
	}
}  // namespace binary