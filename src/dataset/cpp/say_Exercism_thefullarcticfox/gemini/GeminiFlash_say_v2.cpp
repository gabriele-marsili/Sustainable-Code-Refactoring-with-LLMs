#include "say.h"
#include <map>
#include <vector>
#include <stdexcept>
#include <algorithm>
#include <sstream>

namespace say {
	std::string in_english(unsigned long long n) {
		if (n > 999999999999ULL)
			throw std::domain_error("more than one trillion");

		static const std::map<unsigned long long, std::string> dict = {
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

		std::vector<int> parts;
		parts.reserve(4); // Max 4 parts: billion, million, thousand, [hundreds]

		while (n != 0) {
			parts.push_back(n % 1000);
			n /= 1000;
		}
		std::reverse(parts.begin(), parts.end());

		std::stringstream res;
		bool need_space = false;

		for (size_t i = 0; i < parts.size(); ++i) {
			int part = parts[i];
			if (part == 0) continue;

			if (need_space) {
				res << " ";
			}
			need_space = true;

			if (part >= 100) {
				res << dict.at(part / 100) << " hundred";
				part %= 100;
				if (part != 0) {
					res << " ";
				} else {
					need_space = false;
				}
			}

			if (part >= 20) {
				res << dict.at(part / 10 * 10);
				if (part % 10 != 0) {
					res << "-" << dict.at(part % 10);
				} else {
					need_space = false;
				}
			} else if (part != 0) {
				res << dict.at(part);
				need_space = false;
			}

			size_t remaining_parts = parts.size() - i - 1;
			if (remaining_parts > 0) {
				if (remaining_parts == 1) {
					res << " thousand";
				} else if (remaining_parts == 2) {
					res << " million";
				} else if (remaining_parts == 3) {
					res << " billion";
				}
				need_space = true;
			}
		}

		return res.str();
	}
}  // namespace say