/*
 * =====================================================================================
 *
 *       Filename:  prime_factors.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  01.11.2015 16:39:49
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "prime_factors.h"


namespace prime_factors
{
	std::vector<int> of(int num)
	{
		std::vector<int> primes{};


		for(int count{2}; count <= num; ++count)
		{
			if( num % count ==0)
			{
				primes.push_back(count);
				num /= count;
				--count;
			}
		}

		return std::move(primes);
	}
}