/*
 * =====================================================================================
 *
 *       Filename:  sum_of_multiples.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  31.10.2015 20:32:18
 *       Revision:  none
 *       Compiler:  gcc
 *
 *   Organization:  
 *
 * =====================================================================================
 */

#include "sum_of_multiples.h"



namespace sum_of_multiples
{
	unsigned to(unsigned num)
	{
		return to({3,5},num);
	}


	unsigned to( std::initializer_list<unsigned> const& multiples, int num)
	{
		int sum{0};
		for( unsigned i=0; i< num; ++i)
		{
			for( int const multiple : multiples)
			{
				if( i% multiple ==0)
				{
					sum += i;
					break;
				}
			}
		}
		return sum;
	}
}