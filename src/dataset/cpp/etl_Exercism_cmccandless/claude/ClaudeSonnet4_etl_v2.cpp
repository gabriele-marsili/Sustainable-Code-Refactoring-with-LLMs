#include "etl.h"

using namespace std;

map<char, int> etl::transform(map<int, vector<char>> old)
{
	map<char, int> dict;
	dict.reserve(old.size() * 10); // Reasonable estimate for typical use
	
	for (const auto &pair : old)
	{
		const int key = pair.first;
		for (char ch : pair.second) 
		{
			dict[ch | 0x20] = key; // Bitwise OR for lowercase conversion
		}
	}
	return dict;
}