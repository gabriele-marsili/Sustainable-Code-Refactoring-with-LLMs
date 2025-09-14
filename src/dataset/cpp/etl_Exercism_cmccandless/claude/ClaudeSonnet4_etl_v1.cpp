#include "etl.h"

using namespace std;

map<char, int> etl::transform(map<int, vector<char>> old)
{
	map<char, int> dict;
	dict.reserve(26); // Reserve space for typical alphabet size
	
	for (const auto &pair : old)
	{
		const int key = pair.first;
		for (const char ch : pair.second) 
		{
			dict[static_cast<char>(tolower(static_cast<unsigned char>(ch)))] = key;
		}
	}
	return dict;
}