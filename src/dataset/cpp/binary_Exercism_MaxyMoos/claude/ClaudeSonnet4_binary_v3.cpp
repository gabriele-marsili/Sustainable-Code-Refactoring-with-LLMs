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
	int power = input.length() - 1;
	
	for (char digit : input)
	{
		if (digit < '0' || digit > '1')
			return 0;
		
		if (digit == '1')
			result += (1 << power);
		
		power--;
	}
	return result;
}