#include "binary.h"

namespace binary {
	int		convert(const std::string& hex) {
		int	res = 0;
		const char* data = hex.data();
		const size_t size = hex.size();
		
		for (size_t i = 0; i < size; ++i) {
			const char l = data[i];
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