#include "roman_numerals.h"

namespace roman_numerals {
	std::string convert(uint32_t decimal) {
		
		std::string roman = "";
		std::vector < std::pair<uint16_t, std::string>> numbers;
		numbers.push_back(std::make_pair(1000, "M"));
		numbers.push_back(std::make_pair(900, "CM"));
		numbers.push_back(std::make_pair(500, "D"));
		numbers.push_back(std::make_pair(400, "CD"));
		numbers.push_back(std::make_pair(100, "C"));
		numbers.push_back(std::make_pair(90, "XC"));
		numbers.push_back(std::make_pair(50, "L"));
		numbers.push_back(std::make_pair(40, "XL"));
		numbers.push_back(std::make_pair(10, "X"));
		numbers.push_back(std::make_pair(9, "IX"));
		numbers.push_back(std::make_pair(5, "V"));
		numbers.push_back(std::make_pair(4, "IV"));
		numbers.push_back(std::make_pair(1, "I"));

		while (decimal) {
			for (auto i : numbers) {
				if (i.first <= decimal) {
					decimal -= i.first;
					roman += i.second;
					break;
				}
			}
		}
		return roman;
	}
}  // namespace roman_numerals
