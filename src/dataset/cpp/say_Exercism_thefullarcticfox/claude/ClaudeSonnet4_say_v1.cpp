#include "say.h"
#include <string>
#include <stdexcept>

namespace say {
	std::string	in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		static const char* const ones[] = {
			"", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
			"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
			"seventeen", "eighteen", "nineteen"
		};

		static const char* const tens[] = {
			"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
		};

		static const char* const scales[] = { "", " thousand", " million", " billion" };

		if (n == 0) return "zero";

		std::string result;
		result.reserve(128);

		int scale_index = 0;
		unsigned long long temp = n;
		
		// Count digits to determine scale
		while (temp >= 1000) {
			temp /= 1000;
			scale_index++;
		}

		while (n > 0) {
			unsigned int part = n % 1000;
			n /= 1000;

			if (part == 0) {
				scale_index--;
				continue;
			}

			std::string part_str;
			part_str.reserve(32);

			// Hundreds
			if (part >= 100) {
				part_str += ones[part / 100];
				part_str += " hundred";
				part %= 100;
				if (part > 0) part_str += " ";
			}

			// Tens and ones
			if (part >= 20) {
				part_str += tens[part / 10];
				if (part % 10 > 0) {
					part_str += "-";
					part_str += ones[part % 10];
				}
			} else if (part > 0) {
				part_str += ones[part];
			}

			part_str += scales[scale_index];

			if (!result.empty()) {
				result = part_str + " " + result;
			} else {
				result = part_str;
			}

			scale_index--;
		}

		return result;
	}
}  // namespace say