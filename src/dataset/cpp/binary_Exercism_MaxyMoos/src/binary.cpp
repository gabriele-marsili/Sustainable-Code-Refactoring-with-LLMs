#include "binary.h"
#include <iostream>

using namespace std;

int pow(int exponent)
{
	int result = 1;
	for (int i = 1; i <= exponent; i++)
	{
		result *= 2;
	}
	return result;
}

int binary::convert(string input)
{
	int result = 0;
	int size = input.length() - 1;
	for (auto i: input)
	{
		int tmp = int(i) - '0';
		if (tmp < 0 || tmp > 9)
			return 0;
		result += tmp * pow(size);
		size--;
	}
	return result;
}
