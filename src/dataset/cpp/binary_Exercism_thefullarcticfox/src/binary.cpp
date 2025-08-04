#include "binary.h"

namespace binary {
	int		convert(const std::string& hex) {
		int	res = 0;
		for (size_t i = 0; i < hex.size(); i++) {
			res *= 2;
			char	l = hex.at(i);
			if (l == '0' || l == '1')
				res += (l - '0');
			else
				return (0);
		}
		return (res);
	}
}  // namespace binary
