#include "sieve.h"

vector<int> sieve::primes(int max)
{
	if (max <= 2) return max == 2 ? vector<int>{2} : vector<int>();
	
	auto p = vector<int>();
	p.reserve(max / (log(max) - 1)); // Approximate prime count
	
	auto np = vector<bool>(max, false);
	np[0] = np[1] = true;
	
	for (int i = 2; i * i < max; i++)
	{
		if (np[i]) continue;
		for (int j = i * i; j < max; j += i) np[j] = true;
	}
	
	for (int i = 2; i < max; i++)
	{
		if (!np[i]) p.push_back(i);
	}
	
	return p;
}