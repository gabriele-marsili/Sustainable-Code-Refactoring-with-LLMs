#include "binary.h"

#include <cmath>

namespace binary {

	int convert(const std::string& binary) {
		const auto length = binary.length();
		auto decimal = 0;

		for (size_t i = 0; i < length; ++i) {
			const size_t position_from_end = length - 1 - i;
			const auto bit = binary.at(position_from_end);
			
			if (bit == '1') {
				decimal += pow(2, i);
			} else if (bit != '0') {
				// Invalid character detected.
				return 0;
			}
		}

		return decimal;
	}
} // namespace binary
