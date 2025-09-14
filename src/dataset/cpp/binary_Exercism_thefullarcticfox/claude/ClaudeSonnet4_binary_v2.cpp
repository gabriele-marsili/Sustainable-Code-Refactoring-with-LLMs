#include "binary.h"

namespace binary {
	int		convert(const std::string& hex) {
		int	res = 0;
		const char* str = hex.c_str();
		const size_t len = hex.size();
		
		for (size_t i = 0; i < len; i++) {
			char l = str[i];
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