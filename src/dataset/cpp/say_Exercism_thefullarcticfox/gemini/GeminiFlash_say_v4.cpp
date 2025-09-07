#include "say.h"
#include <array>
#include <stdexcept>
#include <algorithm>
#include <sstream>

namespace say {
	std::string	in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		static constexpr std::array<std::pair<unsigned long long, const char*>, 28> dict = {
			std::make_pair(0, "zero"), std::make_pair(1, "one"), std::make_pair(2, "two"), std::make_pair(3, "three"), std::make_pair(4, "four"),
			std::make_pair(5, "five"), std::make_pair(6, "six"), std::make_pair(7, "seven"), std::make_pair(8, "eight"), std::make_pair(9, "nine"),
			std::make_pair(10, "ten"), std::make_pair(11, "eleven"), std::make_pair(12, "twelve"), std::make_pair(13, "thirteen"),
			std::make_pair(14, "fourteen"), std::make_pair(15, "fifteen"), std::make_pair(16, "sixteen"), std::make_pair(17, "seventeen"),
			std::make_pair(18, "eighteen"), std::make_pair(19, "nineteen"), std::make_pair(20, "twenty"), std::make_pair(30, "thirty"),
			std::make_pair(40, "forty"), std::make_pair(50, "fifty"), std::make_pair(60, "sixty"), std::make_pair(70, "seventy"),
			std::make_pair(80, "eighty"), std::make_pair(90, "ninety"),
		};

		for (const auto& pair : dict) {
			if (pair.first == n) {
				return pair.second;
			}
		}

		std::array<int, 4> parts{};
		parts[0] = (n % 1000);
		parts[1] = ((n / 1000) % 1000);
		parts[2] = ((n / 1000000) % 1000);
		parts[3] = ((n / 1000000000) % 1000);

		std::stringstream res;
		bool need_space = false;

		if (parts[3] != 0) {
			res << in_english(parts[3]) << " billion";
			need_space = true;
		}
		if (parts[2] != 0) {
			if (need_space) res << " ";
			res << in_english(parts[2]) << " million";
			need_space = true;
		}
		if (parts[1] != 0) {
			if (need_space) res << " ";
			res << in_english(parts[1]) << " thousand";
			need_space = true;
		}
		if (parts[0] != 0) {
			if (need_space) res << " ";

			int part = parts[0];
			if (part >= 100) {
				for (const auto& pair : dict) {
					if (pair.first == part / 100) {
						res << pair.second << " hundred";
						break;
					}
				}
				part %= 100;
				if (part)
					res << " ";
			}
			if (part >= 20) {
				for (const auto& pair : dict) {
					if (pair.first == (part / 10) * 10) {
						res << pair.second;
						break;
					}
				}
				if (part % 10)
					res << "-";
				part %= 10;
			}
			if (part) {
				for (const auto& pair : dict) {
					if (pair.first == part) {
						res << pair.second;
						break;
					}
				}
			}
		}

		return res.str();
	}
}  // namespace say