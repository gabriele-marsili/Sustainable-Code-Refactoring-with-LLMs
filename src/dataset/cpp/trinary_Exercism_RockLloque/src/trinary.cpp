/*
 * =====================================================================================
 *
 *       Filename:  trinary.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  01.11.2015 17:44:00
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "trinary.h"
#include <algorithm>

namespace trinary
{
	unsigned to_decimal(std::string const& trinum)
	{
		if( std::find_if( trinum.cbegin(), trinum.cend(),
				   [] (char c) { return not ( (c=='0') or (c=='1') or (c=='2'));}) != trinum.cend())
		{
			return 0;
		}

		unsigned decimal{0};
		for( char element : trinum)
		{
			decimal*=3;
			decimal += element -'0';
		}
		return decimal;
	}
}