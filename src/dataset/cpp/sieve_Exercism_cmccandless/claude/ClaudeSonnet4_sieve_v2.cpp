#include "sieve.h"

vector<int> sieve::primes(int max)
{
	if (max <= 2) return max == 2 ? vector<int>{2} : vector<int>();
	
	auto p = vector<int>();
	p.reserve(max / (log(max) - 1)); // Approximate prime count
	
	auto np = vector<bool>(max, false);
	np[0] = np[1] = true;
	
	p.push_back(2);
	for (int j = 4; j < max; j += 2) np[j] = true;
	
	for (int i = 3; i * i < max; i += 2)
	{
		if (np[i]) continue;
		p.push_back(i);
		for (int j = i * i; j < max; j += i + i) np[j] = true;
	}
	
	for (int i = (p.back() < 3 ? 3 : p.back() + 2); i < max; i += 2)
	{
		if (!np[i]) p.push_back(i);
	}
	
	return p;
}