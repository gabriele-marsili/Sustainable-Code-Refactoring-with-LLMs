#include "hexadecimal.h"

 uint32_t hexadecimal::convert(std::string number) {

	 for (auto i : number) {
		 if (i < 48 || (i > 57 && i < 97) || i > 102)
			 return 0;
	 }
	 uint32_t sum = 0;
	 std::map<char, int>digits;
	 digits['0'] = 0;
	 digits['1'] = 1;
	 digits['2'] = 2;
	 digits['3'] = 3;
	 digits['4'] = 4;
	 digits['5'] = 5;
	 digits['6'] = 6;
	 digits['7'] = 7;
	 digits['8'] = 8;
	 digits['9'] = 9;
	 digits['a'] = 10;
	 digits['b'] = 11;
	 digits['c'] = 12;
	 digits['d'] = 13;
	 digits['e'] = 14;
	 digits['f'] = 15;

	 int power = 0;
	 for (std::string::reverse_iterator iterator = number.rbegin(); iterator != number.rend(); ++iterator) {
		 sum += digits[*iterator] * std::pow(16,power);
		 power++;
	}
	 return sum;
}