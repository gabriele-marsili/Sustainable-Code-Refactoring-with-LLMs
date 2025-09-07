#include "luhn.h"
#include <cctype>

namespace luhn {
	bool	valid(const std::string& str) {
		if (str.find_first_not_of(" 0123456789") != std::string::npos)
			return false;
		
		int sum = 0;
		int digit_count = 0;
		bool alternate = false;
		
		for (int i = str.size() - 1; i >= 0; --i) {
			if (std::isdigit(str[i])) {
				int digit = str[i] - '0';
				++digit_count;
				
				if (alternate) {
					digit *= 2;
					if (digit > 9)
						digit -= 9;
				}
				sum += digit;
				alternate = !alternate;
			}
		}
		
		return digit_count >= 2 && sum % 10 == 0;
	}
}