#include "roman_numerals.h"
#include <stdexcept>
#include <array>

namespace roman_numerals {
	std::string	convert(int arabic_num) {
		if (arabic_num < 0)
			throw std::domain_error("less than zero");

		static constexpr std::array<std::pair<int, const char*>, 13> roman_digits{{
			{1000, "M"},	{900, "CM"},
			{500, "D"},		{400, "CD"},
			{100, "C"},		{90, "XC"},
			{50, "L"},		{40, "XL"},
			{10, "X"},		{9, "IX"},
			{5, "V"},		{4, "IV"},
			{1, "I"}
		}};

		std::string	res;
		res.reserve(15); // Maximum possible length for valid Roman numerals
		
		for (const auto& digit : roman_digits) {
			int count = arabic_num / digit.first;
			if (count > 0) {
				arabic_num -= count * digit.first;
				for (int i = 0; i < count; ++i) {
					res += digit.second;
				}
			}
		}

		return res;
	}
}  // namespace roman_numerals