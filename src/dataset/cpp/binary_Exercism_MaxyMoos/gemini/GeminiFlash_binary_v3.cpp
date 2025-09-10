#include "binary.h"
#include <iostream>
#include <string>

using namespace std;

int pow(int exponent)
{
	if (exponent < 0) return 0;
	if (exponent == 0) return 1;
	if (exponent == 1) return 2;

	int result = 2;
	for (int i = 1; i < exponent; ++i)
	{
		result *= 2;
	}
	return result;
}

int binary::convert(string input)
{
	int result = 0;
	int size = input.length();
	for (int i = 0; i < size; ++i)
	{
		char c = input[i];
		if (c != '0' && c != '1')
			return 0;

		result = (result << 1) | (c - '0');
	}
	return result;
}