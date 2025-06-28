#include "trinary.h"

uint32_t trinary::to_decimal(std::string num) {
	uint32_t len = num.length();
	uint32_t sum = 0;
	std::string::const_iterator it;
	for (it = num.begin(); it != num.end(); it++) {
		if (isalpha(*it))
			return 0;
	}
	for (int i = len-1, j = 0; i >=0; --i, j++) {
		int a = static_cast<int>(num[i] - 48);
		sum += a * pow(3,j);
	}
	
	return sum;
}