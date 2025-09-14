#include "trinary.h"

int trinary::to_decimal(string s)
{
	int result = 0;
	for (char ch : s)
	{
		if (ch < '0' || ch > '2') return 0;
		result = result * 3 + (ch - '0');
	}
	return result;
}