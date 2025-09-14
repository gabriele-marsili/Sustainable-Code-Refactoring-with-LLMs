#include "binary.h"
#include <iostream>

using namespace std;

int pow(int exponent)
{
	return 1 << exponent;
}

int binary::convert(string input)
{
	int result = 0;
	for (char digit : input)
	{
		int tmp = digit - '0';
		if (tmp < 0 || tmp > 1)
			return 0;
		result = (result << 1) + tmp;
	}
	return result;
}