#include "binary.h"
#include <iostream>

using namespace std;

int binary::convert(string input)
{
	int result = 0;
	int power = 1;
	
	for (int i = input.length() - 1; i >= 0; i--)
	{
		int digit = input[i] - '0';
		if (digit < 0 || digit > 1)
			return 0;
		result += digit * power;
		power <<= 1;
	}
	return result;
}