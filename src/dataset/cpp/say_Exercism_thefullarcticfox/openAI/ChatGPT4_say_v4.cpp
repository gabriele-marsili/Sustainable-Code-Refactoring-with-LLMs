#include "say.h"
#include <array>
#include <stdexcept>
#include <string>

namespace say {
	std::string in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		static const std::array<std::string, 20> small_numbers = {
			"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
			"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
		};
		static const std::array<std::string, 10> tens = {
			"", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
		};
		static const std::array<std::string, 4> scales = {
			"", " thousand", " million", " billion"
		};

		if (n < 20)
			return small_numbers[n];

		auto number_to_words = [&](unsigned long long num) -> std::string {
			std::string result;
			if (num >= 100) {
				result += small_numbers[num / 100] + " hundred";
				num %= 100;
				if (num > 0)
					result += " ";
			}
			if (num >= 20) {
				result += tens[num / 10];
				if (num % 10)
					result += "-" + small_numbers[num % 10];
			} else if (num > 0) {
				result += small_numbers[num];
			}
			return result;
		};

		std::string result;
		for (int i = 3; i >= 0; --i) {
			unsigned long long scale_value = static_cast<unsigned long long>(std::pow(1000, i));
			if (n >= scale_value) {
				result += number_to_words(n / scale_value) + scales[i];
				n %= scale_value;
				if (n > 0)
					result += " ";
			}
		}

		return result.empty() ? small_numbers[0] : result;
	}
}  // namespace say