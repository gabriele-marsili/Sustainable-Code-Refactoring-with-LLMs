#include "roman_numerals.h"

namespace roman
{
	constexpr pair<const char*, int> _t[] =
	{
		{"M", 1000},
		{"CM", 900},
		{"D", 500},
		{"CD", 400},
		{"C", 100},
		{"XC", 90},
		{"L", 50},
		{"XL", 40},
		{"X", 10},
		{"IX", 9},
		{"V", 5},
		{"IV", 4},
		{"I", 1},
	};

	string convert(int x)
	{
		string result;
		result.reserve(16);
		
		for (const auto& p : _t)
		{
			while (x >= p.second)
			{
				result += p.first;
				x -= p.second;
			}
		}
		return result;
	}
}