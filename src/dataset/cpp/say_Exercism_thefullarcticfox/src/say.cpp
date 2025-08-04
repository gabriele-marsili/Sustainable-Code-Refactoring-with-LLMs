#include "say.h"
#include <map>
#include <vector>
#include <stdexcept>
#include <algorithm>

namespace say {
	std::string	in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		const std::map<unsigned long long, std::string>	dict = {
			{0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"},
			{5, "five"}, {6, "six"}, {7, "seven"}, {8, "eight"}, {9, "nine"},
			{10, "ten"}, {11, "eleven"}, {12, "twelve"}, {13, "thirteen"},
			{14, "fourteen"}, {15, "fifteen"}, {16, "sixteen"}, {17, "seventeen"},
			{18, "eighteen"}, {19, "nineteen"}, {20, "twenty"}, {30, "thirty"},
			{40, "forty"}, {50, "fifty"}, {60, "sixty"}, {70, "seventy"},
			{80, "eighty"}, {90, "ninety"},
		};

		try {
			return (dict.at(n));
		} catch (const std::out_of_range& e) {}

		std::vector<int>	parts;
		parts.reserve(20);

		while (n != 0) {
			parts.push_back(n % 1000);
			n /= 1000;
		}
		std::reverse(parts.begin(), parts.end());

		std::string	res;
		for (size_t i = 0; i < parts.size(); i++) {
			if (parts.at(i) == 0)
				continue;
			auto	part = parts.at(i);
			if (part / 100) {
				res += dict.at(part / 100) + " hundred";
				if (part % 100)
					res += " ";
			}
			part %= 100;
			if (part / 10) {
				res += dict.at(part / 10 * 10);
				if (part % 10)
					res += "-" + dict.at(part % 10);
			} else if (part % 10)
				res += dict.at(part % 10);

			if (parts.size() - i == 2)
				res += " thousand";
			if (parts.size() - i == 3)
				res += " million";
			if (parts.size() - i == 4)
				res += " billion";
			for (size_t j = i + 1; j < parts.size(); j++) {
				if (parts.at(j) != 0) {
					res += " ";
					break;
				}
			}
		}

		return (res);
	}
}  // namespace say
