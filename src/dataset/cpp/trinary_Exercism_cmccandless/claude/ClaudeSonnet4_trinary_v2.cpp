#include "trinary.h"

int trinary::to_decimal(string s)
{
	auto result = 0;
	for (auto ch : s)
	{
		auto x = ch - '0';
		if (x > 2) return 0;
		result = result * 3 + x;
	}
	return result;
}