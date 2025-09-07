#include "say.h"
#include <unordered_map>
#include <vector>
#include <stdexcept>
#include <string>

namespace say {
	std::string in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		static const std::unordered_map<unsigned long long, std::string> dict = {
			{0, "zero"}, {1, "one"}, {2, "two"}, {3, "three"}, {4, "four"},
			{5, "five"}, {6, "six"}, {7, "seven"}, {8, "eight"}, {9, "nine"},
			{10, "ten"}, {11, "eleven"}, {12, "twelve"}, {13, "thirteen"},
			{14, "fourteen"}, {15, "fifteen"}, {16, "sixteen"}, {17, "seventeen"},
			{18, "eighteen"}, {19, "nineteen"}, {20, "twenty"}, {30, "thirty"},
			{40, "forty"}, {50, "fifty"}, {60, "sixty"}, {70, "seventy"},
			{80, "eighty"}, {90, "ninety"},
		};

		if (dict.count(n)) {
			return dict.at(n);
		}

		static const std::vector<std::string> scales = {"", " thousand", " million", " billion"};
		std::vector<std::string> parts;

		for (size_t scale_idx = 0; n > 0; ++scale_idx) {
			unsigned long long part = n % 1000;
			n /= 1000;

			if (part == 0) continue;

			std::string part_str;
			if (part / 100) {
				part_str += dict.at(part / 100) + " hundred";
				part %= 100;
				if (part) part_str += " ";
			}
			if (part >= 20) {
				part_str += dict.at(part / 10 * 10);
				if (part % 10) part_str += "-" + dict.at(part % 10);
			} else if (part > 0) {
				part_str += dict.at(part);
			}

			if (!scales[scale_idx].empty()) {
				part_str += scales[scale_idx];
			}

			parts.push_back(part_str);
		}

		std::reverse(parts.begin(), parts.end());
		std::string result;
		for (size_t i = 0; i < parts.size(); ++i) {
			if (i > 0) result += " ";
			result += parts[i];
		}

		return result;
	}
}  // namespace say