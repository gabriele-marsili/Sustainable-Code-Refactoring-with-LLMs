#include "say.h"
#include <array>
#include <stdexcept>

namespace say {
	std::string	in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		static constexpr std::array<const char*, 100> dict = {
			"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
			"ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
			"twenty", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"thirty", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"forty", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"fifty", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"sixty", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"seventy", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"eighty", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr,
			"ninety", nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr, nullptr
		};

		if (n < 100 && dict[n])
			return dict[n];

		static constexpr const char* scale[] = {"", " thousand", " million", " billion"};
		
		std::string res;
		res.reserve(128);
		
		int parts[4];
		int part_count = 0;
		
		if (n == 0) return "zero";
		
		while (n > 0 && part_count < 4) {
			parts[part_count++] = n % 1000;
			n /= 1000;
		}
		
		bool first = true;
		for (int i = part_count - 1; i >= 0; i--) {
			int part = parts[i];
			if (part == 0) continue;
			
			if (!first) res += " ";
			first = false;
			
			if (part >= 100) {
				res += dict[part / 100];
				res += " hundred";
				if (part % 100) res += " ";
			}
			
			part %= 100;
			if (part >= 20) {
				res += dict[part / 10 * 10];
				if (part % 10) {
					res += "-";
					res += dict[part % 10];
				}
			} else if (part > 0) {
				res += dict[part];
			}
			
			res += scale[i];
		}
		
		return res;
	}
}