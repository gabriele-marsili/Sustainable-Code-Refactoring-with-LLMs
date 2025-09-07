#include "luhn.h"
#include <cctype>
#include <string>

namespace luhn {
	bool valid(const std::string& str) {
		size_t digit_count = 0;
		int sum = 0;
		bool alternate = false;

		for (long i = str.length() - 1; i >= 0; --i) {
			if (std::isspace(str[i])) continue;

			if (!std::isdigit(str[i])) {
				return false;
			}

			int digit = str[i] - '0';
			digit_count++;

			if (alternate) {
				digit *= 2;
				if (digit > 9) {
					digit -= 9;
				}
			}

			sum += digit;
			alternate = !alternate;

			if (i == 0) break;
		}

		return (digit_count > 1) && (sum % 10 == 0);
	}
}  // namespace luhn