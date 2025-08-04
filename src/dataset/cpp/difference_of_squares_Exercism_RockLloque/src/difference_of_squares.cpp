/*
 * =====================================================================================
 *
 *       Filename:  difference_of_squares.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  16.08.2015 17:10:15
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "difference_of_squares.h"

namespace squares
{
	unsigned square_of_sums(unsigned number)
	{ return ( (number * (number +1))/2) * ( (number * (number +1))/2);}

	unsigned sum_of_squares( unsigned number)
	{
		unsigned temp{};
		//sadly I don't know any formula, that could simplify the calculation,
		//as I did in square_of_sums 
		for( unsigned i = 1; i<= number; ++i)
			temp += i*i;
		return temp;
	}

	unsigned difference( unsigned number)
	{ return square_of_sums(number) - sum_of_squares(number);}
		
}