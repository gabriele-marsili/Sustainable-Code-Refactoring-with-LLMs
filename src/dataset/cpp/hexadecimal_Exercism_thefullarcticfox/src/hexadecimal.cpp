#include "hexadecimal.h"

namespace hexadecimal {
	int		convert(const std::string& hex) {
		int	res = 0;
		for (size_t i = 0; i < hex.size(); i++) {
			res *= 16;
			char	l = hex.at(i);
			if (l >= '0' && l <= '9')
				res += (l - '0');
			else if (l >= 'a' && l <= 'f')
				res += (l - 'a' + 10);
			else
				return (0);
		}
		return (res);
	}
}  // namespace hexadecimal
