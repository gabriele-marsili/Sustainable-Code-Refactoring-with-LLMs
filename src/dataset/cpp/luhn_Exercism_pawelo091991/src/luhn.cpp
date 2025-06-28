#include "luhn.h"
#include <iostream>
#include <string>
#include <algorithm>

using std::string;

bool luhn::valid(string str) {

	int digit;
	int sum = 0;
	string::iterator it;
	str.erase(std::remove(str.begin(), str.end(), ' '), str.end());
	reverse(str.begin(), str.end());

	if (str.length() <= 1)
		return false;


	for (it = str.begin(); it < str.end(); it++) {
		if (*it < 48 || *it > 57)
			return false;

		digit = (int)(*it - 48);

		if ((std::distance(str.begin(), it)+1) % 2 == 0) {
			digit *= 2;
			if (digit > 9)
				digit -= 9;
		}
		sum += digit;
	}

	if (sum % 10 == 0)
		return true;
	else
		return false;
}