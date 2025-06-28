#include "sieve.h"
#include <map>
#include <iostream>

using namespace std;

vector<int> sieve::primes(int range)
{
	vector<int> result;
	map<int, bool> array;
	for (int i = 2; i <= range; i++)
		array[i] = true;

	map<int, bool>::iterator it = array.begin();
	
	while(it != array.end())
	{
		if ((*it).second)
		{
			map<int, bool>::iterator curIt = it;
			for(int i = 0; i < (*it).first ; i++)
				curIt++;

			while(curIt != array.end())
			{
				(*curIt).second = false;
				for(int i = 0; i < (*it).first ; i++)
				{
					if (curIt != array.end())
						curIt++;
					else
						break;
				}
			}
		}
		it++;
	}
	for (auto elem: array)
	{
		if (elem.second == true)
			result.push_back(elem.first);
	}
	return result;
}