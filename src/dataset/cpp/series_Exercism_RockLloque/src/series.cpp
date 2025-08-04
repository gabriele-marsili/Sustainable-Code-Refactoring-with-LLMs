/*
 * =====================================================================================
 *
 *       Filename:  series.cpp
 *
 *    Description:  
 *
 *        Version:  1.0
 *        Created:  01.11.2015 10:59:05
 *       Revision:  none
 *       Compiler:  gcc
 *
 *
 * =====================================================================================
 */

#include "series.h"
#include <stdexcept>

namespace series
{
	std::vector<int> digits( std::string const& input)
	{
		std::vector<int> intVec{};
		for(char const element : input)
		{
			intVec.push_back( element - '0');	
		}

		return intVec;
	}

	std::vector<std::vector<int>> slice(std::string const& input, int length)
	{
		if( length > input.length())
		{
			throw std::domain_error("Slice-length longer than input");
		}
		std::vector<std::vector<int>> result{};
		for( size_t i{0}; (i+length) <= input.length(); ++i)
		{
			result.push_back( digits( input.substr(i, length)));
		}
		
		return result;
	}
}