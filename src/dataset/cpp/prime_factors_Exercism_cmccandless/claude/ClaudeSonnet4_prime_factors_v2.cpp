#include "prime_factors.h"

vector<int> prime_factors::of(int x)
{
	auto facts = vector<int>();
	facts.reserve(32); // Reserve space for typical number of prime factors
	
	// Handle factor 2 separately
	while (x % 2 == 0)
	{
		x /= 2;
		facts.push_back(2);
	}
	
	// Check odd factors up to sqrt(x)
	for (int i = 3; i * i <= x; i += 2)
	{
		while (x % i == 0)
		{
			x /= i;
			facts.push_back(i);
		}
	}
	
	// If x is still > 1, then it's a prime factor
	if (x > 1)
	{
		facts.push_back(x);
	}
	
	return facts;
}