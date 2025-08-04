#include "roman_numerals.h"
#include <stdexcept>
#include <map>

namespace roman_numerals {
	std::string	convert(int arabic_num) {
		if (arabic_num < 0)
			throw std::domain_error("less than zero");

		const std::map< int, std::string, std::greater<int> >	roman_digits{
			{1000, "M"},	{900, "CM"},
			{500, "D"},		{400, "CD"},
			{100, "C"},		{90, "XC"},
			{50, "L"},		{40, "XL"},
			{10, "X"},		{9, "IX"},
			{5, "V"},		{4, "IV"},
			{1, "I"}
		};

		std::string	res;
		for (auto& digit : roman_digits) {
			while (arabic_num / digit.first) {
				arabic_num -= digit.first;
				res += digit.second;
			}
		}

		return (res);
	}
}  // namespace roman_numerals
