#ifndef PRIME_H
#define PRIME_H
#include <vector>
#include <cmath>
#include <algorithm>
#include <stdexcept>

namespace prime
{

	bool isPrime(unsigned n)
	{
		for( unsigned i{ static_cast<unsigned>(std::sqrt(n))}; i > 1; --i)
		{
			if( n % i == 0)
			{
				return false;
			}
		}
		return true;
	}
	unsigned nth(unsigned n)
	{
		if( n<1)
		{
		  	throw std::domain_error("Out of range!");
		}

		unsigned primeCounter{0}, candidate{1};


		while( primeCounter < n)
		{
			if( isPrime(++candidate))
			{
				++primeCounter;
			}
		}

		return candidate;

	}
#endif
}