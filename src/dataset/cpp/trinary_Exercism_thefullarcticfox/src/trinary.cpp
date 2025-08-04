#include "trinary.h"

namespace trinary {
	int		to_decimal(const std::string& trinary) {
		int	res = 0;

		for (char digit : trinary) {
			if (digit < '0' || digit > '2')
				return 0;
			res *= 3;
			res += digit - '0';
		}
		return res;
	}
}  // namespace trinary
