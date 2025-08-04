#ifndef SIEVE_H
#define SIEVE_H
#include <vector>
#include <cmath>
namespace sieve
{
	std::vector<int> primes(unsigned n)
	{
		std::vector<bool> numbersToCheck(n, true);
		unsigned maxCheck{static_cast<unsigned>(std::sqrt(n))};

		for( unsigned i{0}; i < n; ++i)
		{
			for(unsigned j{2}; (j <= maxCheck) and (j<i); ++j)
			{
				if( numbersToCheck.at(i))
				{
					numbersToCheck.at(i) = not( (i+1)%j==0);
				}
			}
		}

		std::vector<int> result{};
		for( int i{1}; i< numbersToCheck.size(); ++i)
		{
			if(numbersToCheck.at(i))
			{
				result.push_back(i+1);
			}
		}
		return result;
	}
}





#endif