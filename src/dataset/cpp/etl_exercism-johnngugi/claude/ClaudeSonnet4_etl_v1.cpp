#include "etl.h"
#include <map>
#include <vector>
#include <algorithm>
#include <cctype>
using namespace std;

map<char, int> etl::transform(map<int, vector<char> > a)
{
	map<char, int> store;
	
	for (const auto& pair : a)
	{
		const int score = pair.first;
		for (char c : pair.second)
		{
			store[tolower(c)] = score;
		}
	}
	return store;
}