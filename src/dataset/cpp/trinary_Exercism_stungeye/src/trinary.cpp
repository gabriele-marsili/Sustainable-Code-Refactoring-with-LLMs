#include "trinary.h"

namespace trinary {
	int from_base_to_decimal(const int base, const std::string& numerals) {
		auto decimal = 0;

		for (const auto numeral : numerals) {
			const auto digit = numeral - '0';

			if ((digit < 0) || (digit >= base)) {
				return 0;
			}

			decimal *= base;
			decimal += digit;
		}

		return decimal;
	}

	int to_decimal(const std::string& trinary) {
		return from_base_to_decimal(3, trinary);
	}
} // namespace trinary
